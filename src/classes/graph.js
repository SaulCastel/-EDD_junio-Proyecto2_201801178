export default class Graph{  
    constructor(){
        this.nullCount = 0;
    }
    _render(string){
        d3.select("#canva-graphs")
        .graphviz()
        .zoom(false)
        .renderDot(string);
    }
    //BSTree_methods  
    graphBStree(tree){
        let string = 'digraph BSTree_graph{\nnode[shape=record];\n';
        string += 'nodesep=1;\n';
        string += 'ranksep=1;\n';
        string += this._graphNode(tree.root);
        string += '}';
        this._render(string);
    }
    _graphNode(node){
        let string = `${node.id}[label="<f0>|<f1>${node.data}|<f2>"];\n`;
        if (node.left){
            string += `${node.id}:f0 -> ${node.left.id}:f1;\n`;
            string += this._graphNode(node.left);
        }
        else{
            string += this._graphNullLeft(node);
        }
        if(node.right){
            string += `${node.id}:f2 -> ${node.right.id}:f1;\n`;
            string += this._graphNode(node.right);
        }
        else{
            string += this._graphNullRight(node);
        }
        return string;
    }
    _graphNullLeft(node){
        let string = `null${this.nullCount}[shape=point];\n`;
        string += `${node.id}:f0 -> null${this.nullCount++};\n`;
        return string;
    }
    _graphNullRight(node){
        let string = `null${this.nullCount}[shape=point];\n`;
        string += `${node.id}:f2 -> null${this.nullCount++};\n`;
        return string;
    }
    graphLinkedList(list){
        let string = 'digraph linkedList_graph{\nnode[shape=box];\n';
        string += 'nodesep=0.7;\n{rank=same;\n';
        let aux = list.head;
        while(aux != null){
            string += `${aux.id}[label="${aux.data}"]`;
            if (aux.next != null){
                string += `${aux.id} -> ${aux.next.id};\n`;
            }
            aux = aux.next;
        }
        string += '}\n}';
        this._render(string);
    }
    graphHashMap(map){
        let string = 'digraph hashMap_graph{\nnode[shape=box];\n';
        this._render(string);
    }
    _genSubList(node){
        let string = 'subgraph {\n';
        string += '\tnode[shape=plaintext];\n';
        string += `\t${node.id}_list [label=<\n`;
        string += '\t<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">\n';
        let aux = node.data.head;
        for (let i = 0; i < node.data.len; i++) {
            string += `\t<TR><TD>${aux.data}</TD></TR>\n`;
            aux = aux.next;
        }
        string += '\t</TABLE>>];\n'
        string += `\t${node.id} -> ${node.id}_list;\n}`;
        return string;
    }
}