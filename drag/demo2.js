var racers = [],
	volunteers = [],
	racersList,
	volunteersList,
	lists,
	fieldsets,
	members;

function loadDemo() {
	racersList = document.getElementById('racers');
	volunteersList = document.getElementById('volunteers');

	lists = [racersList, volunteersList];

	[].forEach.call(lists, function(list) {
		list.addEventListener('dragenter', handleDragEnter, false);
		list.addEventListener('dragleave', handleDragLeave, false);
		list.addEventListener('drop', handleDrop, false);
	});

	racersList.addEventListener('dragover', handleDragOverRacers, false);
	volunteersList.addEventListener('dragover', handleDragOverVolunteers, false);

	fieldsets = document.querySelectorAll('#racersField, #volunteersField');
	[].forEach.call(fieldsets, function(fieldset) {
		fieldset.addEventListener('dragover', handleDragOverOuter, false);
	});

	members = document.querySelectorAll('#members li');
	[].forEach.call(members, function(member) {
		member.addEventListener('dragstart', handleDragStart, false);
		member.addEventListener('dragend', handleDragEnd, false);
	});
}
window.addEventListener('load', loadDemo, false);

function handleDragStart(e) {
	e.effectAllowed = 'copy';
	e.dataTransfer.setData('text/plain', e.target.textContent);
	e.dataTransfer.setData('text/html', e.target.dataset.age);
	console.log('dragstart: ' + e.target.textContent);
	return true;
}

function handleDragEnter(e) {
	e.stopPropagation();
	e.preventDefault();
	return false;
}

function handleDragLeave(e) {
	return false;
}

function handleDragOverOuter(e) {
	if (e.target.id == 'racersField') {
		racersList.className = 'validtarget';
	} else {
		volunteersList.className = 'validtarget';
	}
	e.stopPropagation();
	return false;
}

function handleDragOverRacers(e) {
	e.dataTransfer.dropEffect = 'copy';
	e.stopPropagation();
	e.preventDefault();

	racersList.className = 'highlighted';
	return false;
}

function handleDragOverVolunteers(e) {
	e.dataTransfer.dropEffect = 'copy';
	e.stopPropagation();
	e.preventDefault();

	volunteersList.className = 'highlighted';
	return false;
}

function handleDrop(e) {
	e.preventDefault();
	e.stopPropagation();
	var dropTarget = e.target,
		text = e.dataTransfer.getData('text/plain'),
		group = volunteers,
		list = volunteersList;

	if ((dropTarget.id != 'volunteers') && (dropTarget.parentNode.id != 'volunteers')) {
		text = e.dataTransfer.getData('text/html') + ": " + text;
		group = racers;
		list = racersList;
	}

	if (group.indexOf(text) == -1) {
		group.push(text);
		group.sort();

		while(list.hasChildNodes()) {
			list.removeChild(list.lastChild);
		}

		[].forEach.call(group, function(person) {
			var newChild = document.createElement('li');
			newChild.textContent = person;
			list.appendChild(newChild);
		});
	}
	return false;
}

function handleDragEnd(e) {
	racersList.className = '';
	volunteersList.className = '';
	return false;
}