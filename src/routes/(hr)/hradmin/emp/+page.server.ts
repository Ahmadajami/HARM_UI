import type { Employee, MangerListDTO } from '$lib/mytypes';
import { addpath } from '$lib/serverurl';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
type Salaryres = {
	realSalary: number;
	month: number;
};

export const load: PageServerLoad = async () => {
	//if (!locals.user) redirect(303, '/');
	//get all employee
	/*
	const employee_listurl: URL = addpath('/api/employee/listAll');
	const employee_listcall = await fetch(employee_listurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});
	if (!employee_listcall.ok) {
		error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
	}
	const employee_list: Employee[] = await employee_listcall.json();

	///api/manager/listAllManagers
	const manger_listurl: URL = addpath('/api/manager/listAllManagers');
	const manger_listcall = await fetch(manger_listurl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + locals.user.token
		}
	});

	const totot: MangerListDTO[] = await manger_listcall.json();
	employee_list.forEach((v) => {
		v.reports?.forEach((z) => {
			z.dateIssued = new Date(z.dateIssued);
		});
	});
	totot.forEach((v) => {
		v.dateOfBirth = new Date(v.dateOfBirth);
	});
*/
	return {};
};

export const actions: Actions = {
	salary: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		console.log('from righ nav', Form_data);
		const salryurl: URL = addpath(
			'/api/employee/calculateSalary',
			`username=${Form_data.username}`
		);

		const Salarycall = await fetch(salryurl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			}
		});
		if (!Salarycall.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}
		const Salaryrebody: Salaryres = await Salarycall.json();

		const salary = Salaryrebody.realSalary.toFixed(2);

		/*
		/api/employee/calculateSalary?username=abd2
		{
    "realSalary": 64.66956521739131,
    "month": 1
}
*/
		return {
			salarysuc: true,
			salary: salary,
			month: Salaryrebody.month,
			username: Form_data.username
		};
	},
	addbenfit: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		console.log('from righ nav modal', Form_data);

		const Addbenfitsurl: URL = addpath('/api/benefit/addBenefitToEmployee');
		const Addbenfitscall = await fetch(Addbenfitsurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				username: Form_data.usernmae,
				benefitId: Form_data.befits
			})
		});
		if (!Addbenfitscall.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}
		return { benfitsuc: true };
	},
	editmanger: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());
		console.log('from editmanger', Form_data);
		const Changemangerurl: URL = addpath('/api/manager/addEmployeeToManager');
		const mangerEdit = await fetch(Changemangerurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				employeeUsername: Form_data.usernmae,
				managerUsername: Form_data.manger
			})
		});
		if (!mangerEdit.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}

		return { editmangesuc: true };
	},
	makemanger: async ({ request, locals }) => {
		const Form_data = Object.fromEntries(await request.formData());

		const Changemangerurl: URL = addpath('/api/manager/makeManager');
		const mangerEdit = await fetch(Changemangerurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + locals.user.token
			},
			body: JSON.stringify({
				employeeUsername: Form_data.employeeUsername,
				newSalary: Form_data.newSalary,
				newContractNumber: Form_data.newContractNumber
			})
		});
		if (!mangerEdit.ok) {
			error(400, { id: 999, codes: '401', messages: 'server erorr ', message: 'erorr' });
		}

		return { promatemanger: true };
	},
	filedrop: async ({ request, locals }) => {
		console.log('here');
		const Form_data = Object.fromEntries(await request.formData());

		const fd = new FormData();
		fd.append('attendance', Form_data.attendence);

		const uploadfileurl: URL = addpath('/api/employee/uploadAttendance');
		///api/employee/uploadAttendance

		const file = await fetch(uploadfileurl, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + locals.user.token
			},
			body: fd
		});
		if (!file.ok) {
			console.log('error');
		} else {
			console.log('file has been sent');
		}

		return { filedone: true };
	}
};
