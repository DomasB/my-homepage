import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

var App = React.createClass({
	render: function() {
		return (
		<div className="container-fluid">
			<div className="row">
				<Main url="/files/cities.json"/>
			</div>
		</div>
	)}
});

var Main = React.createClass({
	getInitialState: function() {
		return {data: [], working:[], points:0, loading:"loading"};
	},

	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
				this.handleReset();

			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	handleClick: function(props) {
		var currentState = this.state.working;
		var points = this.state.points;
		_.each(currentState[props.index].choices, function(item, key){
			if(item.ans){
				item.class = "noselect list-group-item list-group-item-success";
			}
		});
		if(!props.ans) {
			currentState[props.index].choices[props.item].class = "noselect list-group-item list-group-item-danger";
		} else {
			points++;
		};

		currentState[props.index].disabled = true;
		this.setState({working:currentState, points:points});
	},

	handleReset: function(){
		this.setState({loading:"loading"});
		var arr = _.first(_.shuffle(this.state.data),8);
		var choice =_.first(_.shuffle(_.difference(this.state.data, arr)), 24);
		var cities = _.map(arr, function(item, index) {
			item = _.extend(item, {ans:true});
			item = _.extend(item, {disabled:false})
			var choices = _.first(_.shuffle(choice),3);
			choice = _.difference(choice, choices);
			_.each(choices,function(element, index){
				element.ans=false;
			});
			choices.push(item);
			_.each(choices,function(element, index){
				element.class="noselect list-group-item"
			});
			item.choices = _.shuffle(choices);
		 return item;
	 });
	 this.replaceState({working:cities, data:this.state.data, points:this.state.points, loading:""});
	},

	render: function() {
		var click = this.handleClick;
		var reset = this.handleReset;
		var loading = this.state.laoding;
		var wells = _.map(this.state.working, function(item, index){
			return <Well item={item} key={index} index={index} click={click} loading={loading}/>
		});

		return (
			<div className="main ">
				<Menu click={reset} points={this.state.points} />
				{loading}
				{wells}
			</div>
		);
	}
});

function Menu(props) {
	return (
		<div className="navbar navbar-default navbar-fixed-top text-center">
			<button type="button" onClick={props.click} className="btn btn-warning"> <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span> Naujas</button>
			<span className="badge"> Taškai: {props.points}</span>
		</div>
	)
};

function Image(props) {
	return <img src={'/images/herbai/'+props.link} />
};

function Well(props) {
	return (
			<div className="well col-md-3 col-sm-12 {props.loading}">
				<Image link={props.item.img} />
				<Combo item={props.item} index={props.index} click={props.click}/>
			</div>
		)

};

function Combo(props) {
	var items = _.map(props.item.choices, function(item, key){
		return	 <Item key={key} text={item.name} id={props.index+''+key} index={props.index} item={key} ans={item.ans} click={props.click} itemClass={item.class} disabled={props.item.disabled}/>
	});
	return (
		<div className="list-group">
			{items}
		</div>
	)
};

function Item(props) {
	var component = this;
	return(
		<div className="radio">
		<input type="radio" name={props.index} id={props.id} value={props.text} disabled={props.disabled} onClick={props.click.bind(null, props)}/>
			<label className={props.itemClass +" text-nowrap"} htmlFor={props.id}>
				{props.text + " herbas"}
				</label>
				</div>
			)};

ReactDOM.render(<App/>, document.getElementById('app'));
