let task_btn_count = 1;
let task_objs = [];
task_objs.push(document.querySelector('.css-task-box-div').innerHTML)



function addTask()
{
  if(task_btn_count<4)
    {
        let newBTN = `<button class='css-task-btn' onclick="task_complete(${task_btn_count})">Task ${task_btn_count}</button>`
        task_objs.push(newBTN)
        task_btn_count++;
        show_tasks()
    }
}
function show_tasks()
{
let newBTN=''
        
  for(let i=1;i<task_objs.length;i++){newBTN+=task_objs[i]}
  if(task_btn_count<4)
    {
      document.querySelector('.css-task-box-div').innerHTML=newBTN+task_objs[0]
    }
  else if(task_btn_count==4)
    {
      document.querySelector('.css-task-box-div').innerHTML=newBTN;
    }
    
}
function task_complete(index)
{
  //index = task_objs.
}
