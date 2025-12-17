export default {
  methods: {
    formatDate(dateString: string | null | undefined): string {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    },
  },
};

