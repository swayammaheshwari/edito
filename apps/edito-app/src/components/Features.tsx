export function Features() {
  const features = [
    {
      title: "Real-time Collaboration",
      description:
        "Multiple users can edit simultaneously with instant synchronization powered by Yjs CRDT technology.",
      icon: "⚡",
    },
    {
      title: "Rich Text Editing",
      description:
        "Full-featured editor with BlockNote, supporting formatting, lists, and more.",
      icon: "✨",
    },
    {
      title: "Workspace Management",
      description:
        "Organize documents in workspaces with flexible document hierarchy.",
      icon: "📁",
    },
    {
      title: "User Presence",
      description:
        "See who's online and where they're editing with cursor awareness.",
      icon: "👥",
    },
    {
      title: "Embeddable SDK",
      description:
        "Easy-to-integrate React SDK that works seamlessly with your application.",
      icon: "🔌",
    },
    {
      title: "Auto-save",
      description:
        "Changes are automatically saved to MongoDB with no manual intervention.",
      icon: "💾",
    },
  ];

  return (
    <div className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built with modern technologies to provide the best collaborative
            editing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
