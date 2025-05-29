export default class Project {
    private projectId: string;
    private professionalId: string;
    private title: string;
    private startDate: string;

    constructor(
        projectId: string,
        professinalId: string,
        title: string,
        startDate: string
    ) {
        this.projectId = projectId
        this.professionalId = professinalId
        this.title = title
        this.startDate = startDate
    }

    static async modelCreateProject(data: any) {
        const projectId = crypto.randomUUID();
        return new Project(
            projectId,
            data.professionalId,
            data.title,
            data.startDate
        );
    }

    getProject() {
        return ({
            projectId: this.projectId,
            professionalId: this.professionalId,
            title: this.title,
            startDate: this.startDate
        })
    }
}