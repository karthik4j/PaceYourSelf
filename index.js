let MiscActiveBtn=2;
let ImpActiveBtn=1;
let ImpCompletedTask=0;
let MiscCompletedTask = 0;
function storeLocally()
{
  //loop to fetch contents from the misc div
  let misc_task_btns = document.querySelectorAll('.css-task-btn')
  MiscTaskList=[]
  misc_task_btns.forEach(bt => {

    if(bt.id.includes('Misc'))
      {
        MiscTaskList.push(bt.outerHTML)
      }
  });
}
function LoadData()
{
  let obj = localStorage.getItem('todo')
  if(!obj)
    {
      impTaskLists=[]
      impTaskLists.
      ImpActiveBtn=2;
      ImpCompletedTask=0;
    }
  else
  {
     obj = JSON.parse(obj)
    impTaskLists = obj[0];
    ImpCompletedTask=obj[1];
    ImpActiveBtn=obj[2];
  }
  
  let MiscObj = localStorage.getItem('todo-misc')
  if(!MiscObj)
    {
      MiscTaskList=[]
      MiscTaskList.push(document.querySelector('.misc-task-list').innerHTML);
      MiscTaskList.push('');
      MiscActiveBtn=2;
      MiscCompletedTask=0;
    }
  else
  {
    MiscObj = JSON.parse(MiscObj)
    MiscTaskList = MiscObj[0];
    MiscCompletedTask=MiscObj[1];
    MiscActiveBtn=MiscObj[2];
  }
}


function askTask(task_type)
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
            task_added(task_input.value,task_type);
            task_input.value='';
          }
      })

    document.querySelector('.js-task-ok').addEventListener('click',()=>
      {
        task_added(task_input.value,task_type)        
        task_input.value='';
      })
}


function addTask(task_type)
{ 
  let task_input;
  if(task_type==='imp')
    {
      if(ImpActiveBtn<4)
        {
          askTask('imp')
        }
    }
  else if(task_type==='misc')
    {
      if(MiscActiveBtn==2)
        {
          let misc_task_div = document.querySelector('.misc-task-div')
          let add = document.createElement('button')
          add.classList.add('css-remove-task')
          add.id='reset-tasks'
          add.innerHTML='Clear tasks'
          add.addEventListener('click',()=>{clear_tasks('misc')})
          misc_task_div.append(add)
          askTask(task_type)
        }
      else
      {
         askTask(task_type)
      }
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
function task_added(word,task_type)
  {
        
        if(word.length==0)
          {
            let show_error = document.querySelector('.css-input-error')
            show_error.innerHTML="Task name cannot be empty."
          }
        else
        {
          if(task_type==="imp")
            {
              let imp_task_div = document.querySelector('.imp-buttons-list');
              
              let newBTN = document.createElement('button')
              newBTN.classList.add('css-task-btn')
              newBTN.id = ImpActiveBtn
              ImpActiveBtn++
              newBTN.innerHTML=word;
              newBTN.addEventListener('click',()=>{task_complete(newBTN.id,'imp')})
              imp_task_div.append(newBTN)
              clear_user_prompt() 

                if(ImpActiveBtn==4)
                {
                  let btn = document.getElementById('ImpAdd')
                  btn.remove()
                }
            }
          else if(task_type==="misc")
            {
             // let newBTN = `<button class='css-task-btn' id="Miscbtn${MiscActiveBtn}" onclick="task_complete(${MiscActiveBtn},'misc')">${word}</button>`;   
              let misc_task_div = document.querySelector('.misc-task-div')

              let newBTN=document.createElement('button')
              newBTN.innerHTML=word;
              newBTN.id=`Misc${MiscActiveBtn}`
              MiscActiveBtn++;
              newBTN.classList.add('css-task-btn')
              newBTN.addEventListener('click',()=>{task_complete(newBTN.id,'misc')})
              misc_task_div.append(newBTN)
              clear_user_prompt()
            }
        }

      update_progress_bar(calc_percent())
  
  }

function re_add_start()
{
  //<button class="js-btn-add css-add-task-btn" onclick="addTask('imp')">Add a new task</button>
  let btn = document.createElement('button')
  let imp_div = document.querySelector('.imp-buttons-list')

  btn.classList.add('js-btn-add')
  btn.classList.add('css-add-task-btn')
  btn.addEventListener('click',()=>{addTask('imp')})
  btn.innerHTML='Add a new Task'
  btn.id='ImpAdd'
  imp_div.append(btn)
  ImpActiveBtn=1
}
function task_complete(bt,task_type)
{
  if(task_type === 'imp')
    {
      let btn = document.getElementById(bt)
      if(btn.classList.contains('css-task-completed'))
        {
          ImpCompletedTask--
          btn.classList.remove('css-task-completed')
        }
      else
      {
        ImpCompletedTask++;
        btn.classList.add('css-task-completed')
        
          if(ImpCompletedTask===3)
            {
                setTimeout(()=>
                  {                  
                  clear_tasks('imp');
                  ImpCompletedTask=0;
                  ImpActiveBtn=0;
                  re_add_start();
                  },1000)
            }
      }
                  

    }
    else if(task_type == 'misc')
    {
      let btn = document.getElementById(bt)
      if(btn.classList.contains('css-task-completed'))
        {
          MiscCompletedTask--
          btn.classList.remove('css-task-completed')
        }
      else
      {
        MiscCompletedTask++;
        btn.classList.add('css-task-completed')
      }
    }
  update_progress_bar(calc_percent())
}
function calc_percent()
{
  let nos_imp = document.querySelector('.imp-buttons-list')
  nos_imp = nos_imp.querySelectorAll('.css-task-btn').length

  let nos_misc = document.querySelector('.misc-task-div')
  nos_misc = nos_misc.querySelectorAll('.css-task-btn').length
         // console.log(nos_misc)
  let total_btns = nos_imp+nos_misc;
  let percentage = (MiscCompletedTask+ImpCompletedTask)/total_btns
  console.log(percentage*100,'%')
  console.log('misc count:',MiscCompletedTask,'misc active:',nos_misc)
    console.log('imp count:',ImpCompletedTask,'imp active:',nos_misc)
  return percentage*100
}
function update_progress_bar(p_val)
{
  let progress = document.getElementById('progressbar')
  let ptr = document.getElementById('ptrprogress')
  let percentage_val = document.querySelector('.js-percentage')

  let degree=(3.6*p_val)
  let ptr_degree = degree+2;
  progress.style.background=`conic-gradient(cornflowerblue ${degree}deg, #fff 0deg)`;
  ptr.style.background=`conic-gradient(from ${ptr_degree}deg,transparent 99%,#ff0000 1%)`
  percentage_val.innerHTML=`${Math.round(degree*100/360)}%`
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
    {  
        localStorage.removeItem('todo')
        localStorage.removeItem('todo-misc')
        location.reload()
    }
function close_banner()
{
  let banner = document.querySelector('.js-overlay')
  banner.classList.remove('css-overlay')
  banner.innerHTML='';
}
function clear_tasks(task_type)
{

  if(task_type==='imp')
    {
      let buttons = document.querySelectorAll('.css-task-completed')

      buttons.forEach(bt => {
        if(bt.id.includes('Misc')===false)
          {
            bt.remove()
            ImpCompletedTask--;
          }
      });
    }

  else if(task_type === 'misc')
    {    
      let buttons = document.querySelectorAll('.css-task-completed')
      console.log('clearing misc')
      buttons.forEach(bt => { 

        if(bt.id.includes('Misc'))
          {
            bt.remove()
            MiscCompletedTask--;
          }
      });
    }
      update_progress_bar(calc_percent())
}
 
//LoadData();

//show_tasks('imp')
//show_tasks('misc')
update_progress_bar(0);
