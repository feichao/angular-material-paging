# angular-material-paging
angular material paging component


### [demo](http://blog.0xfc.cn/2015/09/12/paging/) ###
> ![demo](http://7xl1b4.com1.z0.glb.clouddn.com/angular-material-paging.png)

**demo**

> demo/index.html

**dependencies**
> angular-material-paging depends on angular 1.3.15, angular material ~0.10.0, moment ~2.10.3 as bower.json says.

**install**
> `bower install angular-material-paging --save`

**how to use**

> in you index.html include angular-material-paging.js and angular-material-paging.css
> `app.module('your angular app name', 'fc.paging')`

**use like this**

> `<wan-material-paging wmp-total="=" goto-page="&" position="@" current-page="=" step="="></wan-material-paging>`

**params**
> wmp-total: number of pages.
> 
> position: value equal to angular-material layout-align.
> 
> current-page: current page number.
>  
> goto-page: callback when click page button.
