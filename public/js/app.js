console.log('Client side data');


    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');
    const msg1= document.querySelector('#msg-1');
    const msg2= document.querySelector('#msg-2');

    weatherForm.addEventListener('submit', (e)=>{
        e.preventDefault();
      const location = search.value;
      if(location){
        msg1.textContent = 'Loading ....';
        msg2.textContent = '';
      fetch(`http://localhost:3000/weather?address=${location}`)
    .then((result) => {
        return result.json();
    })
    .then(data => {
        if (data.error)
        {
         //console.log(data.error)
        msg1.textContent = data.error;
        }else {
         //console.log(data);
        msg1.textContent = data[0].placeName;
        msg2.textContent = data[0].summary;
        }
    })
    .catch(error => {
        console.log(error);
    })} else{
        console.log('Input the location for the weather')
    }
    })