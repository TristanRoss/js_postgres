function mapReportsToPageCounts() {
  let reportPageCounts = {};

  for (let key in store['report']) {
    reportPageCounts[key] = 0;
  }

  for (let [p, pObject] of Object.entries(store['page'])) {
    let doc = pObject['document_id'];
    let rep = store['document'][doc]['report_id'];
    reportPageCounts[rep]++;
  }
  return reportPageCounts;
}

function search(str) {
  let reports = new Set();
  for (let [p, pObject] of Object.entries(store['page'])) {
    if (
      (pObject['body'] != null && pObject['body'].includes(str)) ||
      (pObject['footnote'] != null && pObject['footnote'].includes(str))
    ) {
      let doc = pObject['document_id'];
      reports.add(store['document'][doc]['report_id']);
    }
  }

  for (let [doc, docObject] of Object.entries(store['document'])) {
    if (docObject['name'] != null && docObject['name'].includes(str))
      reports.add(docObject['report_id']);
  }

  for (let [rep, repObject] of Object.entries(store['report'])) {
    if (repObject['title'] != null && repObject['title'].includes(str))
      reports.add(repObject['id']);
  }
  return [...reports];
}

async function find(str) {
  let response = await fetch('https://jsonplaceholder.typicode.com/tods');
  let json = await response.json();
  console.log(json);
  // or
  // try {
  //   let response = await fetch('https://jsonplaceholder.typicode.com/tods');
  //   let json = await response.json();
  //   console.log(json);
  // } catch (err) {
  //   console.log(err);
  // }
}
