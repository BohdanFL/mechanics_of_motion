function rotMx(angle) {
	let mx = new Matrix(2, 2);
	mx.data[0][0] = Math.cos(angle);
	mx.data[0][1] = -Math.sin(angle);
	mx.data[1][0] = Math.sin(angle);
	mx.data[1][1] = Math.cos(angle);
	return mx;
}
//applying the separating axis theorem on two objects
function sat(o1, o2) {
	axes1 = [];
	axes2 = [];
	axes1.push(o1.dir.normal());
	axes1.push(o1.dir);
	axes2.push(o2.dir.normal());
	axes2.push(o2.dir);
	let proj1, proj2 = 0;

	for (let i = 0; i < axes1.length; i++) {
		proj1 = projShapeOntoAxis(axes1[i], o1);
		proj2 = projShapeOntoAxis(axes1[i], o2);
		let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
		if (overlap < 0) {
			return false;
		}
	};

	for (let i = 0; i < axes2.length; i++) {
		proj1 = projShapeOntoAxis(axes2[i], o1);
		proj2 = projShapeOntoAxis(axes2[i], o2);
		overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
		if (overlap < 0) {
			return false;
		}
	};

	return true;
}
//returns the min and max projection values of a shape onto an axis
function projShapeOntoAxis(axis, obj) {
	let min = Vector.dot(axis, obj.vertex[0]);
	let max = min;
	for (let i = 0; i < obj.vertex.length; i++) {
		let p = Vector.dot(axis, obj.vertex[i]);
		if (p < min) {
			min = p;
		}
		if (p > max) {
			max = p;
		}
	}
	return {
		min: min,
		max: max
	}
}