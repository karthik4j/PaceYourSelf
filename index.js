let task_btn_count = 1;
let completed_task = 0;
let task_objs = [];
task_objs.push(document.querySelector('.css-task-box-div').innerHTML)

function addTask()
{ 
  let task_input;
  if(task_btn_count<4)
    {
      let askUser=`<div class="css-user-ip">
                <input type="text" placeholder="Task name" class="js-task-name css-task-ip">
                <button class="js-task-ok css-task-ok">Let's go!</button>
              </div>`

      let overlay_div=document.querySelector('.js-overlay') 
     // overlay_div.classList.add('.css-overlay')             
      overlay_div.innerHTML=askUser
      task_input = document.body.querySelector('.js-task-name')
      task_input.focus()
      task_input.addEventListener('keydown',(event)=>
        {
          if(event.key=='Enter')
            {
              task_added(task_input.value);
              task_input.value='';
            }
        })

      document.querySelector('.js-task-ok').addEventListener('click',()=>
        {
          task_added(task_input.value)        
           task_input.value='';
        })

    }
}
function clear_user_prompt()
{
  let close_window = document.querySelector('.css-user-ip')
  close_window.innerHTML='';
  close_window.classList.add('css-close-overlay')
}
function task_added(word)
  {
        let newBTN = `<button class='css-task-btn' id="btn${task_btn_count}" onclick="task_complete(${task_btn_count})">${word}</button>`
        task_objs.push(newBTN)
        task_btn_count++;
        clear_user_prompt()
        show_tasks()        
  }

function show_tasks(reset_val=false)
{
let newBTN=''
        
  for(let i=1;i<task_objs.length;i++){newBTN+=task_objs[i]}
    if(reset_val)
    {
      document.querySelector('.css-task-box-div').innerHTML=task_objs[0]
    }
  if(task_btn_count<4)
    {
      document.querySelector('.css-task-box-div').innerHTML=newBTN+task_objs[0]
    }
  else if(task_btn_count==4)
    {
      document.querySelector('.css-task-box-div').innerHTML=newBTN;
    }

}
function task_complete(bt)
{

let button = document.getElementById(`btn${bt}`)
let  test= button.classList.contains('css-task-completed')
if(test===false)
  {
  button.classList.add('css-task-completed')
  button=button.outerHTML
  task_objs[bt]=button;
  completed_task++;
  update_progress_bar(completed_task)
  }
  if(completed_task==3)
  {
    setTimeout(()=>{ 
    clear_tasks(1);
    clear_tasks(2);
    clear_tasks(3);
    update_progress_bar(0);
  },1000);

    completed_task=0;
  }
  else
  {
    show_tasks()
  }
}

function update_progress_bar(p_val)
{
  let progress = document.getElementById('progressbar')
  let ptr = document.getElementById('ptrprogress')

  if(p_val===0)
    {
      progress.style.background=`conic-gradient(#fff ${1*3.6*100}deg, #fff 0deg)`
    }
  else
  {
  let degree = p_val===1?(1/3):(p_val===2?(2/3):3/3)
  degree*=100*3.6

  let ptr_degree = degree+2;
  progress.style.background=`conic-gradient(#2fbaff ${degree}deg, #fff 0deg)`;
  ptr.style.background=`conic-gradient(from ${ptr_degree}deg,transparent 99%,#ff0000 1%)`
  }
}

function clear_tasks(index)
{
  index = task_objs.indexOf(`<button class='css-task-btn' onclick="task_complete(${index})">Task ${index}</button>`)
  task_objs.splice(index,1)
  task_btn_count--;
  show_tasks(true);
}
update_progress_bar(0);

//console.log(bt,test)
  //console.log(index)
  //console.log(degree,ptr_degree)
 // console.log(ptr.style.background)
