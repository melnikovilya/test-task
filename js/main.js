document.addEventListener('DOMContentLoaded', () => {
  const mySwiper = new Swiper('.swiper', {
    direction: 'vertical',
    clickable: false,
    pagination: {
      clickable: true,
      el: '.swiper-pagination',
    },
  });

  let btn = document.getElementById('video-btn')
  let preload = document.getElementById('video-preload')
  let video = document.getElementById('video')
  btn.addEventListener('click', () => {
    preload.style.display = 'none'
    video.setAttribute("controls","controls")
    video.setAttribute("autoplay","autoplay")
  })

  const validation = new window.JustValidate('#form');
  validation
    .addField('#firstname', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'customRegexp',
        value: /[^0-9][^@$!%*#?&^_-]/,
        errorMessage: 'Недопустимый формат',
      }
    ])
    .addField('#lastname', [
      {
        rule: 'required',
        errorMessage: 'Введите фамилию',
      },
      {
        rule: 'customRegexp',
        value: /[^0-9][^@$!%*#?&^_-]/,
        errorMessage: 'Недопустимый формат',
      }
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите E-mail',
      },
      {
        rule: 'email',
        errorMessage: 'Укажите корректный e-mail',
      }
    ])

})
