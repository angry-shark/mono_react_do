const element = <h1 title="foo"> Hello </h1>
const container = document.getElementById("root")
ReactDOM.render(element,container)



const element = {
    type:"h1",
    props:{
        title:"foo",
        children:"Hello"
    }
}

const node = document.createElement(element.type);
node['title'] = element.props.title;

const text = document.createTextNode("");
text["nodeValue"] = element.props.children;

node.appendChild(text);
container.appendChild(node);






// class ReactDOM{
//     render(element,container){
//         const node = document.createElement(element.type);
//         node['title'] = element.props.title;

//         const text = document.createTextNode("");
//         text["nodeValue"] = element.props.children;

//         node.appendChild(text);
//         container.appendChild(node);
//     }
// }





function createElement(type,props,...children){
    return {
        type,
        props: {
            ...props,
            children:children.map(child => {
                if(typeof children === 'object'){//非文本节点
                    return child
                }else{//文本节点
                    createTextElement(child);
                }
            })
        },
    }
}


function createTextElement(text){
    return {
        type:'TEXT_ELEMENT',
        props:{
            nodeValue:text,
            children:[]
        },
    }
}


function render(element,container) {
    /**此处做递归的终点 */
    const dom = element.type === 'TEXT_ELEMENT'?document.createTextNode(""):document.createElement(element.type);

    const isProperty = (key) => { /**获取props所有中不是children的属性 */
        return key !== "children";
    }

    Object.keys(element.props).filter(isProperty).forEach((name) => { /**将props中的值赋到实际的dom节点的属性上 */
        dom[name] = element.props[name];
    })


    /**递归使用render */
    element.props.children.forEach(child => {
        render(child,dom);
    })

    container.appendChild(dom);
}


/**类似nexttick ，防止递归渲染dom树时间过长，阻塞其他优先级更高的事件 */
let nextUnitOfWork = null;

function workLoop(deadline){
    let shouldYield = false;
    while(nextUnitOfWork && !shouldYield){
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        shouldYield = deadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork){
    //TODO
}





const Didact = {
    createElement,
    render,   
}







// const element = React.creatElement(
//     "h1",
//     {title:'foo'},
//     "Hello"
// )


const element = Didact.createElement(
    "div",
    {id:"foo"},
    Didact.createElement("a",null,"bar"),
    Didact.createElement("b")
)


/* @jsx */
// const element = Didact.createElement(
//     <div id="foo">
//         <a>bar</a>
//         <b />
//     </div>
// )


const container = document.getElementById("root")
Didact.render(element,container)




