const floorsContainer = document.getElementById('aquarium-floors');
const frogs = [];
const foods = [];

function initGrid() {
    for (let f = 4; f >= 0; f--) {
        const floor = document.createElement('div');
        floor.className = 'floor';

        floor.style.width = `${50 + (4 - f) * 12.5}%`;
        floor.style.bottom = `${20 + (4 - f) * 20}px`;
        floor.style.zIndex = 5 - f;

        for (let p = 0; p < 5; p++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.f = f;
            tile.dataset.p = p;
            floor.appendChild(tile);
        }
        floorsContainer.appendChild(floor);
    }
}

function getTile(f, p) {
    return document.querySelector(`.tile[data-f="${f}"][data-p="${p}"]`);
}

document.getElementById('btn-frog').addEventListener('click', () => {
    const f = Math.floor(Math.random() * 5);
    const p = Math.floor(Math.random() * 5);

    const frogEl = document.createElement('div');
    frogEl.className = 'frog';
    getTile(f, p).appendChild(frogEl);

    frogs.push({ el: frogEl, f: f, p: p });
});

document.getElementById('btn-food').addEventListener('click', () => {
    const f = Math.floor(Math.random() * 5);
    const p = Math.floor(Math.random() * 5);

    const foodEl = document.createElement('div');
    foodEl.className = 'food';
    getTile(f, p).appendChild(foodEl);

    foods.push({ el: foodEl, f: f, p: p });
});

setInterval(() => {
    frogs.forEach(frog => {
        if (foods.length > 0) {
            let nearestFood = foods[0];
            let minDist = Math.abs(frog.f - foods[0].f) + Math.abs(frog.p - foods[0].p);

            for (let i = 1; i < foods.length; i++) {
                let dist = Math.abs(frog.f - foods[i].f) + Math.abs(frog.p - foods[i].p);
                if (dist < minDist) {
                    minDist = dist;
                    nearestFood = foods[i];
                }
            }

            if (frog.f < nearestFood.f) frog.f++;
            else if (frog.f > nearestFood.f) frog.f--;
            else if (frog.p < nearestFood.p) frog.p++;
            else if (frog.p > nearestFood.p) frog.p--;

            if (frog.f === nearestFood.f && frog.p === nearestFood.p) {
                nearestFood.el.remove();
                foods.splice(foods.indexOf(nearestFood), 1);
            }
        } else {
            if (Math.random() < 0.3) {
                const axis = Math.random() < 0.5 ? 'f' : 'p';
                const dir = Math.random() < 0.5 ? 1 : -1;

                if (axis === 'f' && frog.f + dir >= 0 && frog.f + dir <= 4) frog.f += dir;
                if (axis === 'p' && frog.p + dir >= 0 && frog.p + dir <= 4) frog.p += dir;
            }
        }

        getTile(frog.f, frog.p).appendChild(frog.el);
    });
}, 1000);

initGrid();