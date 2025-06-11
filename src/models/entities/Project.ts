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

    static async create(title: string, startDate: string, professionalId: string) {
        const projectId = crypto.randomUUID();
        return new Project(
            projectId,
            professionalId,
            title,
            startDate
        );
    }
    getProjectId() {
        return this.projectId;
    }
    getProfessionalId() {
        return this.professionalId;
    }
    getTitle() {
        return this.title;
    }

    getStartDate() {
        return this.startDate;
    }

}
