window.onload = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                //api call 
                const proxy = `http://cors-anywhere.herokuapp.com/`; // to set the cors issue during localhost calls
                const api_key = `18943852fdb11a49d41bb07582251062`;
                const api = `${proxy}https://api.darksky.net/forecast/${api_key}/${lat},${long}`;
                fetch(api)
                    .then((response) => {
                        return response.json()
                    })
                    .then(data => {
                        //console.log(data);
                        let temp = data.currently.temperature; //temperature
                        let summary = data.currently.summary; //comment about temperature
                        let zone = data.timezone;
                        let temp_degree = document.querySelector('.temperature-degree');
                        let temp_disc = document.querySelector('.temperature-discription');
                        let timeZone = document.querySelector('.location-timezone');


                        //set the DOM elements from the API::
                        temp_degree.textContent = temp;
                        temp_disc.textContent = summary;
                        timeZone.textContent = zone;
                        // icons
                        let icons_api = data.currently.icon;
                        let icon_id = document.querySelector('#icon1').id;
                        setIcons(icons_api, icon_id);
                        // convert units 
                        let numeric_value = document.querySelector('.temperature-degree');
                        let unit = document.querySelector('#unit');
                        let unit_section = document.querySelector('.degree-section').addEventListener('click', changeUnits(numeric_value, unit));

                    });
            });

            function setIcons(icons_api, icon_id) {
                const icon_formatted = icons_api.replace(/-/g, "_").toUpperCase();
                let skycons = new Skycons({ "color": "white" });
                skycons.play();
                skycons.set(icon_id, icon_formatted)

            }

            //units conversion
            function changeUnits(numeric_value, unit) {
                if (unit.textContent === "F") {
                    numeric_value.textContent = Math.floor((numeric_value.textContent - 32) / 1.8, 2);
                    unit.textContent = "C";

                } else {
                    unit.textContent = "F"
                    numeric_value.textContent = temp;
                }
            }

        }
    } // window onload function ends