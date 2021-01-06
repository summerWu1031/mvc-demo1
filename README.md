## MVC 三个对象分别做什么?
* M:Model(数据模型)，负责操作所有数据
```javascript
  const m = {
  data: {
    n: xxx,
  },
  create() {},
  delete() {},
  update(data) {},
  get() {},
};
```

* V:View(视图)，负责所有UI界面
```Javascript
const v = {
  el: null,
  //初始化HTML
  html: ``,
  init(container) {
    v.el = $(container);
  },
  //渲染HTML
  render(n) {}
}
```

* C:Controller(控制器)，负责除了数据和视图的其他部分。
```
  const c = {
  init(container) {
    v.init(container);
    v.render(m.data.n); // view = render(data)
    c.autoBindEvents(); //绑定事件
    eventBus.on("m:updated", () => {
      console.log("here");
      v.render(m.data.n);
    });
  },
  events: {
    "click.#add1": "add",
    "click.#minus1": "minus",
    "click.#mul2": "mul",
    "click.#divide2": "div",
  },
  add() {
    m.update({ n: m.data.n + 1 });
  },
  minus() {
    m.update({ n: m.data.n - 1 });
  },
  mul() {
    m.update({ n: m.data.n * 2 });
  },
  div() {
    m.update({ n: m.data.n / 2 });
  },
  autoBindEvents() {
    for (let key in c.events) {
      const spaceIndex = key.indexOf(".");
      const part1 = key.slice(0, spaceIndex);
      const part2 = key.slice(spaceIndex + 1);
      const value = c[c.events[key]];
      v.el.on(part1, part2, value);
    }
  },
};
```

## EventBus 有哪些 API，是做什么用的
```javascript
import $ from 'jquery'

class EventBus {
  constructor() {
    this._eventBus = $(window)
  }

  on(eventName, fn) {
    return this._eventBus.on(eventName, fn)//监听
  }

  trigger(eventName, data) {
    return this._eventBus.trigger(eventName, data)//触发
  }

  off(eventName, fn) {
    return this._eventBus.off(eventName, fn)//关闭
  }
}


 update(data) {
    Object.assign(m.data, data);
    eventBus.trigger("m:updated");
  }
  eventBus.on("m:updated", () => {
      v.render(m.data.n);
    });
  update({ n: m.data.n + 1 })
  //绑定"m:updated"事件，每当事件被触发时就会重新渲染数据
  //每当update的时候，就会触发"m:updated"事件，
```

## 表驱动编程是做什么的
表驱动方法是一种使你可以在表中查找信息，而不必用逻辑语句（if 或 case）来把他们找出来的方法。事实上，任何信息都可以通过表来挑选。在简单的情况下，逻辑语句往往更简单而且更直接。但随着逻辑链的复杂，表就变得越来越富于吸引力了。
表驱动编程的意义在于逻辑与数据的分离。（类似于事件委托）

例如：if-else
```javascript
// 如果想添加一个新的名词翻译，需要再添加一个if-else逻辑，例如：
function translate(term) {
    if (term === '1') {
        return '一'
    } else if (term === '2') {
        return '二'
    } else if (term === '3') {
        return '三'
    } else if (term === '4') {   
        // 此处添加了一个新的名词翻译
        return '四'
    } else {
        return '？？？'  
    }
}
```
表驱动：
```javascript
// 如果想添加一个新的名词翻译，只需要在terms中添加一个新的表项，不需要修改整个逻辑
function translate(term) {
    let terms = {
        '1': '一',
        '2': '二',
        '3': '三'
        '4': '四'   // 添加一个新的名词翻译
    }
    return terms[term];
}
```

## 我是如何理解模块化的
* 模块化就是根据功能或者视图划分为不同的文件（模块），修改功能只需要在对应模块改，而不会牵一发动全身。
* 每一个模块的内部数据的实现是私有的，只是向外部暴露一些接口（方法）与外部其他模块通信。
* 模块化可以降低代码耦合度，减少重复代码，提高代码重用性，并且在项目结构上更加清晰，便于维护。