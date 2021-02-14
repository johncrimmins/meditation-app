const app = () => {
    /* this is a simlpe arrow function ... what's that mean? */

    /* what are things we need? we need the song */

    const song = document.querySelector('.song');

    /* need play button */
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle'); /* we want the CIRCLE inside the svg, bc we want to animate the path inside the circle, not the svg */
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button') /*make sure to do .querySelectorAll bc we want alll the sounds*/

    //Time Display - remember this is just the h3
    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.time-select button')

    //We need to get the length of the outline of the svg
    //get length of the outline
    const outlineLength = outline.getTotalLength();

    //Duration
    let fakeDuration = 600;

    // technically this should be put into a function, not left free here 
    outline.style.strokeDasharray = outlineLength; /* this leaves (value) amount of px empty along the path. outlineLenght is current setting, try 100px */
    outline.style.strokeDashoffset = outlineLength;

    


    // Create a function to stop and play the sounds
    const CheckPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };


    // add ability to pick different sounds
    sounds.forEach (sound => {
        sound.addEventListener('click',function(){
            song.src = this.getAttribute('data-sound'); // add the attribute that we have in html
            video.src = this.getAttribute('data-video');
        })
    })

    //play sound
    play.addEventListener("click",() => {
        CheckPlaying(song);
    });

    // select sound (we built this AFTER testing that we can play sound)
    timeSelect.forEach(option => {
        option.addEventListener('click',function() {
            // we want to change the duration 
            fakeDuration = this.getAttribute('data-time'); // updates fakeDuration with data-time according to click from the html elements featuring data-time attributes, pulling the value of those attributes 
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });


    // track time
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60); /* math.floor() provides a nice round integer */
        let minutes = Math.floor(elapsed / 60);
    
    // animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress; 

    
    // animate the time remaining 
        timeDisplay.textContent = `${minutes}:${seconds}` // use backticks !!!

    // handle timer end
    if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg"; // why do we need to change the source?
        video.pause();
    }
 
 
 
 
 
    }



};

app();