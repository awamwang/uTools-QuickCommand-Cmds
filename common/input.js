// ############ getPatternInput #############

function handleRegexInput(cb) {
  let inputStr = (quickcommand.enterData.payload || '').trim()
  if (typeof cb === 'function') {
    cb(inputStr)
  } else {
    return Promise.resolve(inputStr)
  }
}

/**
 * 依次从剪切板/payload/输入框中获取符合指定Pattern的输入，获取失败则报错，成功则执行回调方法
 * @param {*} pattern
 * @param {*} cb
 * @param {*} options
 * @return {Promise|void} 传入cb，则以回调模式执行，否则返回Promise
 */
function getPatternInput(pattern, cb, options = {}) {
  // 支持不传cb
  if (typeof cb === 'object') {
    options = cb
    cb = null
  }

  if (quickcommand.enterData.type == 'regex') {
    return handleRegexInput(cb)
  }

  let inputStr = (`{{ClipText}}` || '').trim()
  let runner = new Promise((resolve, reject) => {
    if (!pattern.test(inputStr)) {
      return quickcommand.showInputBox([options.inputPlaceholder || '输入']).then((values) => {
        inputStr = values[0]

        if (pattern.test(inputStr)) {
          resolve(inputStr)
        } else {
          reject(inputStr)
        }
      })
    } else {
      resolve(inputStr)
    }
  }).catch((err) => {
    quickcommand.showMessageBox('错误的输入', 'error')
  })

  if (typeof cb === 'function') {
    runner.then(cb)
  } else {
    return runner
  }
}
