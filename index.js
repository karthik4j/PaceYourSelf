function storeLocally()
{
  let obj =[task_objs,completed_task,task_btn_count]
  console.log(obj)
  obj = JSON.stringify(obj)
  localStorage.setItem('todo',(obj));
}
function LoadData()
{
  let obj = localStorage.getItem('todo')
  if(!obj)
    {
      task_objs=[]
      task_objs.push(document.querySelector('.buttons-div').innerHTML);
      task_btn_count=1;
      completed_task=0;
    }
  else
  {
     obj = JSON.parse(obj)
    task_objs = obj[0];
    completed_task=obj[1];
    task_btn_count=obj[2];
  }
}


function addTask()
{ 
  let task_input;
  if(task_btn_count<4)
    {
      let askUser=`<div class="css-user-ip">
                <input type="text" placeholder="Task name" class="js-task-name css-task-ip">
                <button class="js-task-ok css-task-ok">Let's go!</button>
                <div class="css-input-error"></div>
              </div>`

      let overlay_div=document.querySelector('.js-overlay') 
      overlay_div.classList.add('css-overlay')             
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
  close_window.classList.remove('css-overlay')
  let overlay_div=document.querySelector('.js-overlay') 
  overlay_div.innerHTML=''
  overlay_div.classList.remove('css-overlay')
}
function task_added(word)
  {
        if(word.length==0)
          {
            let show_error = document.querySelector('.css-input-error')
            show_error.innerHTML="Task name cannot be empty."
          }
        else
        {
        let newBTN = `<button class='css-task-btn' id="btn${task_btn_count}" onclick="task_complete(${task_btn_count})">${word}</button>`
        task_objs.push(newBTN)
        task_btn_count++;
        clear_user_prompt()
        show_tasks()  
        }

  }

function show_tasks(reset_val=false)
{
let newBTN=''
 
  for(let i=1;i<task_objs.length;i++){newBTN+=task_objs[i]}
    if(reset_val)
    {
      document.querySelector('.buttons-div').innerHTML=task_objs[0]
    }
  if(task_btn_count<4)
    {
      document.querySelector('.buttons-div').innerHTML=newBTN+task_objs[0]
    }
  else if(task_btn_count==4)
    {
      document.querySelector('.buttons-div').innerHTML=newBTN;
    }
    storeLocally()
     update_progress_bar(completed_task)
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
  ///storeLocally();
}

function update_progress_bar(p_val)
{
  let progress = document.getElementById('progressbar')
  let ptr = document.getElementById('ptrprogress')
  let percentage_val = document.querySelector('.js-percentage')
  if(p_val===0)
    {
      progress.style.background=`conic-gradient(#fff ${1*3.6*100}deg, #fff 0deg)`
      percentage_val.innerHTML=`0%`
    }
  else
  {
  let degree=(3.6*p_val*100)/(task_btn_count-1)
  let ptr_degree = degree+2;
  progress.style.background=`conic-gradient(cornflowerblue ${degree}deg, #fff 0deg)`;
  ptr.style.background=`conic-gradient(from ${ptr_degree}deg,transparent 99%,#ff0000 1%)`
  percentage_val.innerHTML=`${Math.round(degree*100/360)}%`
  }
}

function show_about()
{
  let question=`<div class="css-about-page">
                  <div class='about-title-span'>About</div>
                  <div class='about-proj-div'>PaceYourSelf is a todo-list application that is different from a conventional todo-list. It encourages the user to break down their work into manageable parts. At a time, users can only add upto three tasks and they can only add more tasks after completing the previous ones. After completing all three tasks, users can add new tasks that they want to accomplish. By doing this, it encourages them to focus on the task at hand and helps them to feel less overwhelmed. The progress bar lets the user know how much work they have accomplished so far. 
                  <p></p>
                  If you have any doubts about how to operate the app, click the help button, which will provide detailed instructions on how to use the app.
</div>
                  <button class="css-banner-close" onclick=close_banner()>Close</button>
              </div>
              `
  let banner = document.querySelector('.js-overlay')
  banner.classList.add('css-overlay')
   banner.innerHTML=question;
}
function show_help()
{
  let question=`<div class="css-about-page">
                  <div class='about-title-span'>Help</div>
                  <div class='about-proj-div'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                  <button class="css-banner-close" onclick=close_banner()>Close</button>
                  <button class="css-reset-everything css-banner-close" onclick="reset_everything()">Reset everything</button>
              </div>
              `
  let banner = document.querySelector('.js-overlay')
  banner.classList.add('css-overlay')
   banner.innerHTML=question;
}
function reset_everything()
    {   console.log('resetting')
        localStorage.removeItem('todo')
        location.reload()
    }
function close_banner()
{
  let banner = document.querySelector('.js-overlay')
  banner.classList.remove('css-overlay')
  banner.innerHTML='';
}
function clear_tasks(index)
{
  index = task_objs.indexOf(`<button class='css-task-btn' onclick="task_complete(${index})">Task ${index}</button>`)
  task_objs.splice(index,1)
  task_btn_count--;
  show_tasks(true);
}
 LoadData();

show_tasks()
update_progress_bar(0);
//console.log(bt,test)
  //console.log(index)
  //console.log(degree,ptr_degree)
 // console.log(ptr.style.background)
  //console.log('loaded obj',(obj))
