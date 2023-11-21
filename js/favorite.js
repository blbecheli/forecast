const favoriteStar = document.getElementById('star');
const cityInput = document.querySelector("#city-input");
const cityLocal = document.querySelector("#cityLocal");

// Adicione as classes iniciais ao carregar a página, verificando o localStorage
window.addEventListener('load', () => {
    updateFavoriteStar();
});

export const favorite = () => {
    favoriteStar.addEventListener('click', (e) => {
        e.preventDefault();
        const google = cityInput.value.trim();
        const favorite = cityLocal.value.trim();
        saveFav(google, favorite);
        updateFavoriteStar();
    });
};

function saveFav(google, favorite) {
    const cityGoogle = google.split(',')[0].trim();
    const cityStg = favorite.split(',')[0].trim();

    let cityStorage = JSON.parse(localStorage.getItem('cityStorage')) || [];

    const handleCity = (city) => {
        const isCitySaved = cityStorage.some(item => item.city === city);
        const existingCityIndex = cityStorage.findIndex(item => item.city === city);

        if (!isCitySaved) {
            cityStorage.push({ city });
            favoriteStar.classList.add('fa-solid');
            favoriteStar.classList.remove('fa-regular');
        } else {
            cityStorage.splice(existingCityIndex, 1);
            favoriteStar.classList.add('fa-regular');
            favoriteStar.classList.remove('fa-solid');
        }

        localStorage.setItem('cityStorage', JSON.stringify(cityStorage));
    };

    if (cityGoogle) {
        handleCity(cityGoogle);
    }

    if (cityStg) {
        handleCity(cityStg);
    }
}

function updateFavoriteStar() {
    const cityTitle = document.querySelector('#city').textContent;
    const cityStorage = JSON.parse(localStorage.getItem('cityStorage')) || [];

    const isCitySaved = cityStorage.some(item => item.city === cityTitle);
    if (isCitySaved) {
        favoriteStar.classList.add('fa-solid');
        favoriteStar.classList.remove('fa-regular');
    } else {
        favoriteStar.classList.add('fa-regular');
        favoriteStar.classList.remove('fa-solid');
    }
}
