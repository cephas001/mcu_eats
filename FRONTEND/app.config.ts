export default defineAppConfig({
  ui: {
    carousel: {
      slots: {
        dot: ["bg-gray-200", "transition"],
      },
      variants: {
        active: {
          true: {
            dot: "bg-gray-400",
          },
        },
      },
    },
  },
});
