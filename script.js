const input=document.querySelector('input');
const audio=document.querySelector('audio');



input.addEventListener('change',()=>{
    const file=input.files[0];

    if(!file)return;

    audio.src=URL.createObjectURL(file);
    audio.play();
})


//Audio processing

