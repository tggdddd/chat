export default {
    id: "user",
    state: () => {
        a: 1
    },
    getters: {
        b() {
            return 2
        }
    },
    actions: {
        c() {
            this.a = 3
        }
    }
}