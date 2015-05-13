

var Comment = React.createClass({
	render: function() {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return (
			<div className="comment">
				<h2>
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		)
	}
});

var CommentList = React.createClass({
	render: function() {
		return (
			<div className="commentList">
				<Comment author="Pete Hunt">This is one comment</Comment>
				<Comment author="Jordan Walke">This is *author* comment</Comment>
			</div>
		);
	}
});

var CommentForm = React.createClass({
	render: function() {
		return (
			<div className="commentForm">
				Hello world! I am a CommentForm.
			</div>
		);
	}
});

var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="CommentBox">
				<h1>Comments</h1>
				<CommentList />
				<CommentForm />
			</div>
		);
	}
});

var data = [
	{
		author: 'Pete Hunt',
		text: 'This is one comment'
	},
	{
		author: 'Jordan Walke',
		text: 'This is *another* comment'
	}
];


React.render(
	<CommentBox />,
	document.getElementById('content')
);

// ----------------------------------


var CB = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments1</h1>
				<CL data={this.props.data} />
				<CommentForm />
			</div>
		);
	}
});

var CL = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});




React.render(
	<CB data={data} />,
	document.getElementById('content1')
);