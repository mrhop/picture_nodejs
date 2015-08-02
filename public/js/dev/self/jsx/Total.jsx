/**
 * Created by Donghui Huo on 2015/7/16.
 */
var React = require('react');
var $ = require('jquery');
require("bootstrap");
require("bootstrapdatepicker");
require("bootstrapdatepickerzhcn");
require("jquerycolorbox");
require('jquery.cookie');
var GlyphiconGroup = require("./GlyphiconGroup.jsx");
var GlyphiconGroupRight = require("./GlyphiconGroupRight.jsx");
var FormHead = require("./FormHead.jsx");
var PictureContainerList = require("./PictureContainerList.jsx");
var MorePicButton = require("./MorePicButton.jsx");
var TopButton = require("./TopButton.jsx");
var ModalButton = require("./ModalButton.jsx");
var ModalWindow = require("./ModalWindow.jsx");
React.render(<GlyphiconGroup />, $(".header .left")[0]);
React.render(<GlyphiconGroupRight/>, $(".header .right")[0]);
React.render(<FormHead />, $(".header div.center")[0]);
React.render(<PictureContainerList />, $("#fall")[0]);
React.render(<MorePicButton />, $(".main .bottom")[0]);
React.render(<TopButton />, $(".bottom-tool div:first-child")[0]);
React.render(<ModalButton />, $(".bottom-tool div:last-child")[0]);
React.render(<ModalWindow />, $("#addModal")[0]);