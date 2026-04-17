import { DataTypes, Sequelize } from 'sequelize';

const database = process.env.DB_NAME as string;
const username = process.env.DB_USER as string;
const password = process.env.DB_PASS as string;
const host = process.env.DB_HOST as string;
export const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'postgres',
    logging: false,
    define: {
        freezeTableName: true,
    },
});
const modelName = 'documents'
sequelize.define(
    modelName,
    {
        name: { type: DataTypes.STRING(1024), allowNull: false },
        data: { type: DataTypes.BLOB, allowNull: false },
    },
    {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['name'],
                name: `unique_${modelName}_name`,
            },
        ],
        tableName: modelName
    }
);

sequelize.sync();
sequelize.authenticate();

export const fetch = async (documentName: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        sequelize.model(modelName).findOne({
            where: {
                name: documentName
            },
            raw: true
        }).then((document: any) => {
            if (!document) {
                resolve(undefined);
            } else {
                const data = document.data;
                resolve(data);
            }
        })
    })
}

export const store = async (documentName: string, state: any) => {
    try {
        await sequelize?.model(modelName).upsert({
            name: documentName,
            data: state
        }, {
            conflictFields: ['name']
        });
    } catch (error) {
        console.error('Error storing document:', error);
        throw error;
    }
}