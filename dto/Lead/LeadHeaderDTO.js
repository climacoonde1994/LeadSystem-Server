
 

class LeadHeaderDTO {

    Client;

    constructor(clientId,clientList) {
        
        this.Client = clientList.find(({ clientId }) => clientId ===clientId);
        

      }


  }

  module.exports = LeadHeaderDTO;