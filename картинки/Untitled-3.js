'use strict'

const images = [
    {
        imageUrl: 'https://st.depositphotos.com/1899425/1623/i/600/depositphotos_16232649-stock-photo-moraine-lake-sunrise-colorful-landscape.jpg',
        title: 'Mountain Lake'
    },
    {
        imageUrl: 'https://st.depositphotos.com/1005145/2341/i/600/depositphotos_23418410-stock-photo-pink-flowers-in-the-mountains.jpg',
        title: 'Pink sunrise'
    },
    {
        imageUrl: 'https://klike.net/uploads/posts/2019-01/1547365376_1.jpg',
        title: 'Sunset in the mountains'
    },
    {
        imageUrl: 'https://natworld.info/wp-content/uploads/2018/01/%D0%A1%D0%BE%D1%87%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BC%D1%83-%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpeg',
        title: 'River in the mountains'
    },
    {
        imageUrl: 'https://7oom.ru/wp-content/uploads/peizaji-22.jpg',
        title: 'Evening in the desert'
    }
];

let gallery = document.getElementById('gallery');

images.forEach(function(pic) {
    let imgDiv = document.createElement('div'),
        img = document.createElement('img');
    img.setAttribute('src', `${pic.imageUrl}`);
    imgDiv.insertAdjacentHTML('afterbegin', `<span>${pic.title}</span>`);
    imgDiv.className = 'imgDiv';
    imgDiv.append(img);
    gallery.append(imgDiv);
    gallery.onclick = function(event) {
        let target = event.target;
      
        if (target.tagName != 'IMG') return;
      
        showImage(target);
      };
});

let selected;

function showImage(a) {
    if (selected) { 
        selected.classList.remove('active');
    }
    selected = a;
    selected.classList.add('active'); 
}

