

export class Addservice
{
    patientType:string
    roomType:string
	cost:number 
	serviceType:string
    constructor(patientType: string, roomType: string, cost: number,serviceType:string) { 
        this.patientType = patientType;
        this.roomType = roomType;
		this.cost = cost;
		this.serviceType =serviceType
    }
}


export class Service { 
    serviceName: string;
    insertedDate: string;
    department: string;
    fromDate: string;
    tillDate: string;
    inHouse: string;
    // serviceType: string;
    addService: Addservice[];
}

export const servicesList = [
    {
		"patientType":"INPATIENT",
		"roomType":"DOUBLESHARING",
		
		"cost":0
	},
	{
		"patientType":"INPATIENT",
		"roomType":"General Ward-Male",
		
		"cost":0
	},
		{
		"patientType":"INPATIENT",
		"roomType":"General Ward-FeMale",
		
		"cost":0
	},	{
		"patientType":"INPATIENT",
		"roomType":"EMERGENCY",
		
		"cost":0
	},	{
		"patientType":"INPATIENT",
		"roomType":"DayCare",
		
		"cost":0
	},	{
		"patientType":"INPATIENT",
		"roomType":"SINGLE SHARING",
		
		"cost":0
	},	{
		"patientType":"INPATIENT",
		"roomType":"NICU",
		
		"cost":0
	},	{
		"patientType":"INPATIENT",
		"roomType":"ADULT ICU",
		
		"cost":0
	},	{
		"patientType":"INPATIENT",
		"roomType":"PICU",
		
		"cost":0
	},	{
		"patientType":"INPATIENT",
		"roomType":"ISOLATION",
		
		"cost":0
	},	{
		"patientType":"INPATIENT",
		"roomType":"POST OP&PRE OP",
		
		"cost":0
	},	{
		"patientType":"OUTPATIENT",
		"roomType":"NOT APPLICABLE",
		
		"cost":0
	},	{
		"patientType":"OSP",
		"roomType":"NOT APPLICABLE",
		
		"cost":0
	}
];