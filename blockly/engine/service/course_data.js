/* @preserve
 * 
 * 
 * Copyright (c) 2016 UBT Company
 *
 * 
 */

/**
 * courseData.js version 1.0
 * 
 * blockly course data
 * blockly课程数据
 * 
 * feature blockly course data
 * 
 */
'use strict'
;(function() {
    
    function CourseData() {
        this.singleCourseData = {};
        this.courseIndex = 0;
        this.courseId = 2;
        console.log(this.jsonToString(this.courseIndex));
    }
    CourseData.prototype.refreshData = function(data) {
        this.singleCourseData=data;
    }
    // json转字符串
    CourseData.prototype.jsonToString = function(index) {
        return JSON.stringify(this.singleCourseData)
    };
    // 获得课程索引
    CourseData.prototype.getCourseIndex = function() {
        return this.courseIndex;
    };
    // 返回单课课程
    CourseData.prototype.getCourseData = function() {
        return this.singleCourseData;
    };
    CourseData.prototype.getCourseDataByIndex = function(index) {
        return this.singleCourseData;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        var courseData = new CourseData;
        module.exports = courseData;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return new CourseData; });
    } else {
        this.courseData = new CourseData;
    }

}).call(this);