/* global PRIVATEASER*/
'use strict';


(() => {
  const render = (actors) => {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const template = actors.map(actor => {
      return `
        <div class="actor">
          <span>${actor.who}</span>
          <span>${actor.type}</span>
          <span>${actor.amount}</span>
        </div>
      `;
    }).join('');

    div.innerHTML = template;
    fragment.appendChild(div);
    document.querySelector('#actors').innerHTML = '';
    document.querySelector('#actors').appendChild(fragment);
  };

  

  const button = document.querySelector('#compute');

  button.addEventListener('click', function onClick () {
    const bar = PRIVATEASER.getBar();
    const time = document.getElementById('form-time').value;
    const persons = document.querySelector('form-persons').value;
    const option = document.querySelector('form-option').checked;
    const actors = PRIVATEASER.payActors(bar, time, persons, option);

    render(actors);

    return;
  });

  

  const start = document.querySelector('#start');

  start.addEventListener('click', function onClick () {
    document.getElementById("jumbotron").style.display = 'none'
    document.getElementById("stepper").style.display = "initial";
    console.log("Start")
    return;
  });

  const goBooker = document.querySelector('#goBooker');

  goBooker.addEventListener('click', function onClick () {
    document.getElementById("bar-stepper").className = 'completed'
    document.getElementById("bar-container").style.display = 'none'
    document.getElementById("booker-stepper").className = 'active'
    document.getElementById("booker-container").style.display = 'initial'
    return;
  });

  const goResult = document.querySelector('#goResult');

  goResult.addEventListener('click', function onClick () {
    console.log("go result")
    document.getElementById("booker-stepper").className = 'completed'
    document.getElementById("booker-container").style.display = 'none'
    document.getElementById("result-stepper").className = 'active'
    document.getElementById("result-container").style.display = 'initial'

    const bar = PRIVATEASER.getBar();
    const time = document.getElementById('form-time').value;
    const persons = document.getElementById('form-persons').value;
    const option = document.getElementById('form-option').checked;
    const actors = PRIVATEASER.payActors(bar, time, persons, option);

    var div = document.getElementById('alert');

    div.innerHTML += actors[0].amount.toString() + " &euro;";

    console.log(actors)
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Distribution of the price"
      },
      data: [{
        type: "pie",
        startAngle: 240,
        yValueFormatString: "##0.00 &euro;",
        indexLabel: "{label} {y}",
        dataPoints: [
          {y: actors[1].amount, label: "bar"},
          {y: actors[2].amount, label: "insurance"},
          {y: actors[3].amount, label: "treasury"},
          {y: actors[4].amount, label: "privateaser"}
        ]
      }]
    });
    chart.render();

    return;
  });

  

})();
