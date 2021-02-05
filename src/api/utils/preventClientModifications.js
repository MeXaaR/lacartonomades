export const preventClientModifications = collection =>
    collection.deny({
        insert() {
            return true;
        },
        update() {
            return true;
        },
        remove() {
            return true;
        },
    });