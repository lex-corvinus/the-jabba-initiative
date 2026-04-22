export class Frog {
    constructor(row, x, element, rowData) {
        this.row = row;
        this.x = x;
        this.el = element;
        this.width = 17;
        this.speed = 8; // Pixels per tick
        this.rowData = rowData;
        this.updateDOM();
    }

    update(foods) {
        if (foods.length > 0) {
            this.hunt(foods);
        } else {
            this.roam();
        }
        this.updateDOM();
    }

    hunt(foods) {
        let target = foods[0];
        let minDist = Math.abs(this.row - target.row) * 50 + Math.abs(this.x - target.x);

        for (let i = 1; i < foods.length; i++) {
            let dist = Math.abs(this.row - foods[i].row) * 50 + Math.abs(this.x - foods[i].x);
            if (dist < minDist) {
                minDist = dist;
                target = foods[i];
            }
        }

        // Move row
        if (this.row < target.row) this.row++;
        else if (this.row > target.row) this.row--;
        // Move X
        else {
            if (this.x < target.x) this.x += Math.min(this.speed, target.x - this.x);
            else if (this.x > target.x) this.x -= Math.min(this.speed, this.x - target.x);
        }

        // Eat
        if (this.row === target.row && Math.abs(this.x - target.x) <= this.speed) {
            target.el.remove();
            foods.splice(foods.indexOf(target), 1);
        }
    }

    roam() {
        if (Math.random() < 0.3) {
            const dir = Math.random() < 0.5 ? 1 : -1;
            if (this.row + dir >= 1 && this.row + dir <= 4) this.row += dir;
        } else {
            const dir = Math.random() < 0.5 ? 1 : -1;
            this.x += dir * this.speed;
        }
    }

    clampPosition() {
        const data = this.rowData[this.row];
        if (this.x < data.minX) this.x = data.minX;
        if (this.x > data.maxX - this.width) this.x = data.maxX - this.width;
    }

    updateDOM() {
        this.clampPosition();
        const data = this.rowData[this.row];
        this.el.style.left = `${this.x}px`;
        this.el.style.bottom = `${data.baseY}px`;
        this.el.style.zIndex = data.z;
    }
}