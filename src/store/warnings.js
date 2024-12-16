import { defineStore } from "pinia";

export const useWarningsStore = defineStore("warnings", {
  state: () => ({
    warnings: [],
    warningsCount: 0,
  }),
  actions: {
    createWarning(warning, duration = 6000) {
      const currentWarningsCount = this.warningsCount++
      this.warnings.push({ ...warning, id: currentWarningsCount })
      setTimeout(() => {
        this.removeWarning(currentWarningsCount)
      }, duration)
    },
    removeWarning(warningId) {
      this.warnings = this.warnings.filter(item => item.id != warningId)
    }
  }
})