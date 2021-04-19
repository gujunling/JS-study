# JS 对象创建模式

## 方式一：Object 构造函数模式

- 套路: 先创建空 Object 对象, 再动态添加属性/方法。

- 适用场景: 起始时不确定对象内部数据。

- 存在的问题: 需要书写的语句太多。

```
// 先创建空Object对象
let p = new Object();
p = {}; //此时内部数据是不确定的
// 再动态添加属性/方法
p.name = "Tom";
p.age = 12;
p.setName = function (name) {
this.name = name;
};

//测试
console.log(p.name, p.age);
p.setName("Bob");
console.log(p.name, p.age);
```

## 方式二：对象字面量模式

- 套路: 使用{}创建对象, 同时指定属性/方法。

- 适用场景: 起始时对象内部数据是确定的。

- 存在问题: 如果创建多个对象, 会出现大量重复代码。

```
let p = {
    name: "Tom",
    age: 12,
    setName: function (name) {
        this.name = name;
    },
};

    //测试
    console.log(p.name, p.age);
    p.setName("JACK");
    console.log(p.name, p.age);

let p2 = {
    //如果创建多个对象代码很重复
    name: "Bob",
    age: 13,
    setName: function (name) {
        this.name = name;
    },
};
```

## 方式三：工厂模式

- 套路: 通过工厂函数动态创建对象并返回
- 适用场景: 需要创建多个对象
- 问题: 对象没有一个具体的类型, 都是 Object 类型

```
function createPerson(name, age) {
    //返回一个对象的函数 ===> 均可以称为工厂函数
    let obj = {
        name: name,
        age: age,
        setName: function (name) {
        this.name = name;
        },
    };

    return obj;
}

    // 创建2个人
    let p1 = createPerson("小红", 25);
    let p2 = createPerson("小明", 36);

    // p1/p2是Object类型

    function createStudent(name, price) {
        let obj = {
            name: name,
            price: price,
        };
        return obj;
    }
    let s = createStudent("校长", 12000);
    // s也是Object
    console.log("p1 instanceof Object", p1 instanceof Object);
    console.log("p2 instanceof Object", p2 instanceof Object);
    console.log("s instanceof Object", s instanceof Object);
```

## 方式四：自定义构造函数模式

- 套路: 自定义构造函数, 通过 new 创建对象
- 适用场景: 需要创建多个类型确定的对象
- 问题: 每个对象都有相同的数据(方法), 浪费内存

```
//定义类型
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.setName = function (name) {
        this.name = name;
    };
}
    let p1 = new Person("Tom", 12);
    p1.setName("Jack");
    console.log(p1.name, p1.age);
    console.log(p1 instanceof Person);

function Student(name, price) {
    this.name = name;
    this.price = price;
}
    let s = new Student("Bob", 13000);
    console.log(s instanceof Student);

    let p2 = new Person("ali", 23);
    console.log(p1, p2);
```

## 方式五: 构造函数+原型的组合模式

- 套路: 自定义构造函数, 属性在函数中初始化, 方法添加到原型上
- 适用场景: 需要创建多个类型确定的对象

```
function Person(name, age) {
    //在构造函数中只初始化一般函数
    this.name = name;
    this.age = age;
}
    Person.prototype.setName = function (name) {
    this.name = name;
    };

    let p1 = new Person("Tom", 23);
    let p2 = new Person("Jack", 24);
    console.log(p1, p2);
```

注意：这几种对象创建模式并没有具体的优劣之分，应根据自己的实际需求选择适合自己的对象创建模式。
