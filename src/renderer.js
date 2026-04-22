import { Frog } from './entities/frogAI.js';

const aquarium = document.getElementById('aquarium');
const frogs = [];
const foods = [];

export const ROW_DATA = {
    1: { z: 41, baseY: 10, minX: 0, maxX: 130 },
    2: { z: 31, baseY: 14, minX: 4, maxX: 134 },
    3: { z: 21, baseY: 18, minX: 8, maxX: 138 },
    4: { z: 11, baseY: 22, minX: 12, maxX: 142 }
};

function getRandomRow() {
    return Math.floor(Math.random() * 4) + 1;
}

function getRandomX(row, entityWidth) {
    const data = ROW_DATA[row];
    return Math.floor(Math.random() * (data.maxX - data.minX - entityWidth)) + data.minX;
}

function spawnEntity(type, className, width) {
    const row = getRandomRow();
    const x = getRandomX(row, width);

    const el = document.createElement('div');
    el.className = `entity ${className}`;
    el.style.left = `${x}px`;
    el.style.bottom = `${ROW_DATA[row].baseY}px`;
    el.style.zIndex = ROW_DATA[row].z;

    aquarium.appendChild(el);
    return { el, row, x, width };
}

document.getElementById('btn-frog').addEventListener('click', () => {
    const row = getRandomRow();
    const x = getRandomX(row, 17);

    const el = document.createElement('div');
    el.className = 'entity frog';
    aquarium.appendChild(el);

    frogs.push(new Frog(row, x, el, ROW_DATA));
});

document.getElementById('btn-food').addEventListener('click', () => {
    const food = spawnEntity('food', 'food', 4);
    foods.push(food);
});

document.getElementById('btn-deco').addEventListener('click', () => {
    const isGrass = Math.random() > 0.5;
    if (isGrass) spawnEntity('grass', 'grass', 18);
    else spawnEntity('stone', 'stone', 15);
});

setInterval(() => {
    frogs.forEach(frog => frog.update(foods));
}, 500); // 500ms AI tick