import {QueryCtrl} from 'app/plugins/sdk';
import './css/query-editor.css!';

export class GenericDatasourceQueryCtrl extends QueryCtrl {

    constructor($scope, $injector)  {
        super($scope, $injector);

        this.scope = $scope;
        this.target.site = this.target.site || '';
        this.target.host = this.target.host || '';
        this.target.service = this.target.service || '';
        this.target.mode = this.target.mode || 'graph';
        this.target.metric = this.target.metric != null ? this.target.metric : '';
        this.target.graph = this.target.graph != null ? this.target.graph : '';
        this.target.presentation = this.target.presentation != null ? this.target.presentation : '';
        this.target.combinedgraph = this.target.combinedgraph != null ? this.target.combinedgraph : '';
    }

    getSiteOptions() {
        return this.datasource.sitesQuery(this.target);
    }

    getHostOptions() {
        return this.datasource.hostsQuery(this.target);
    }

    getServiceOptions() {
        return this.datasource.servicesQuery(this.target);
    }

    getMetricOptions() {
        return this.datasource.metricsQuery(this.target);
    }

    getGraphOptions() {
        return this.datasource.graphsQuery(this.target);
    }

    getCombinedGraphOptions() {
        return this.datasource.combinedGraphsQuery(this.target);
    }

    getPresentationOptions() {
        return [
            {value: 'lines',   text: 'Lines'},
            {value: 'stacked', text: 'Stacked'},
            {value: 'sum',     text: 'Sum'},
            {value: 'average', text: 'Average'},
            {value: 'min',     text: 'Minimum'},
            {value: 'max',     text: 'Maximum'}
        ];
    }

    getModeOptions() {
        return [
            {text: 'predefined graph', value: 'graph'},
            {text: 'single metric', value: 'metric'},
            {text: 'combined graph', value: 'combined'}
        ];
    }

    getLastError() {
        return this.datasource.getLastError(this.target.refId);
    }

    toggleEditorMode() {
        this.target.rawQuery = !this.target.rawQuery;
    }

    onChangeInternal() {
        this.panelCtrl.refresh(); // Asks the panel to refresh data.
    }

    onSiteChange() {
        this.target.host = '';
        this.target.service = '';
        this.target.metric = '';
        this.target.graph = '';
        this.onChangeInternal();
    }

    onHostChange() {
        this.target.service = '';
        this.target.metric = '';
        this.target.graph = '';
        this.onChangeInternal();
    }

    onServiceChange() {
        this.target.metric = '';
        this.target.graph = '';
        this.onChangeInternal();
    }

    onMetricChange() {
        this.onChangeInternal();
    }

    onGraphChange() {
        this.onChangeInternal();
    }

    onModeChange() {
        this.target.metric = '';
        this.target.graph = '';
        this.onChangeInternal();
    }
}

GenericDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
