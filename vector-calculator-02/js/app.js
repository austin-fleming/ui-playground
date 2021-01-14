class VectorModel {}

class TableView {}

class SimulationView {}

class Controller {
    constructor(vectorModel, tableView, simulationView)
}

export const app = new Controller(new VectorModel(), new TableView(), new SimulationView())