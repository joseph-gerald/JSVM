function accessNestedProperty($) { 
    return $.reduce(((_=this, $) => _[$]), this)
}
accessNestedProperty(["console", "log"])("bruh")