function myModule() {
  //私有数据
  var msg = "My atguigu";
  //操作数据的函数
  // 此时也存在闭包
  function doSomething() {
    console.log("doSomething() " + msg.toUpperCase());
  }
  function doOtherthing() {
    console.log("doOtherthing() " + msg.toLowerCase());
  }

  //向外暴露对象(给外部使用的方法)
  return {
    // 后面的是函数名，前面的是字符串
    doSomething: doSomething,
    doOtherthing: doOtherthing,
  };
}
