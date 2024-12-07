AColorPicker.from('.picker')
    .on('change', (picker, color) => {
        console.log(color)
        document.body.style.backgroundColor = color;
        postColorData(color)
    })
    .on('coloradd', (picker, color) => {
        console.log(color)
      // color added: color
      // modified palette: picker.palette
    })
    .on('colorremove', (picker, color) => {
        console.log(color)
      // color removed: color
      // modified palette: picker.palette
    });

// function for posting color data
const postColorData = async (color) => {
    console.log("sending color data to backend...")
    console.log(typeof color)
    try {
    const response = await fetch('http://localhost:3000/ledProfiles/handleColorFromFrontend', {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: color
    });
    console.log('Response from backend:', response.color);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};
// function postColorData(color) {
//     try {
//     const response = await axios.post('http://localhost:3000/handleColorFromFrontend', color);
//     console.log('Response from backend:', response.color);
//     } catch (error) {
//         console.error('Error sending data:', error);
//     }
// }