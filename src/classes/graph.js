export default class Graph{  
    constructor(){
        this.nullCount = 0;
    }
    _render(string,merkle){
        if(merkle){
            d3.select('#canva-merkle')
            .graphviz()
            .zoom(false)
            .width('100%')
            .height('100%')
            .fit(true)
            .renderDot(string);
        }
        else{
            d3.select('#canva-graphs')
            .graphviz()
            .zoom(false)
            .renderDot(string);
        }
    }
    //BSTree_methods  
    graphBStree(tree,merkle=false){
        let string = 'digraph BSTree_graph{\nnode[shape=record];\n';
        if(merkle){
            string += 'edge[dir=back];\n';
        }
        string += 'splines=false;\n';
        string += 'nodesep=1;\n';
        string += 'ranksep=1;\n';
        string += this._graphNode(tree.root,merkle);
        string += '}';
        if(merkle){
            this._render(string,merkle);
        }
        else{
            this._render(string);
        }
    }
    _graphNode(node,merkle){
        let string;
        if(merkle){
            string = `${node.id}[label="<f0>|<f1>${node.data.slice(0,6)}|<f2>"];\n`;
        }
        else{
            string = `${node.id}[label="<f0>|<f1>${node.data}|<f2>"];\n`;
        }
        if (node.left){
            string += `${node.id}:f0 -> ${node.left.id}:f1;\n`;
            string += this._graphNode(node.left,merkle);
        }
        else{
            string += this._graphNullLeft(node);
        }
        if(node.right){
            string += `${node.id}:f2 -> ${node.right.id}:f1;\n`;
            string += this._graphNode(node.right,merkle);
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
        let string = 'digraph hashMap{\nnode[shape="box"]\nnodesep=0.5;\n';
        let aux = map.h.head;
        for (let i = 0; i < map.m; i++) {
            string += `\t${aux.id}[label="${i}", group=${i}]\n`;
            if(aux.data != null){
                string += this._genSubList(aux,i);
            }
            aux = aux.next;
        }
        aux = map.h.head;
        string += '{rank=same\n'
        for (let i = 0; i < map.m; i++) {
            if(aux.next != null){
                string += `\t${aux.id}->${aux.next.id}\n`;
            }
            aux = aux.next;
        }
        string += '}\n}';
        this._render(string);
    }
    _genSubList(node,group){
        let string = `${node.id}_list [shape=plaintext, label=<\n`;
        string += '<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">\n';
        let aux = node.data.head;
        for (let i = 0; i < node.data.len; i++) {
            string += `\t<TR><TD>${aux.data}</TD></TR>\n`;
            aux = aux.next;
        }
        string += `\t</TABLE>>, group=${group}];\n`
        string += `\t${node.id} -> ${node.id}_list;\n`;
        return string;
    }
}