import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Spinner
} from "reactstrap"
import axios from "axios"
import { ContextLayout } from "../../../../utility/context/Layout"
import { AgGridReact } from "ag-grid-react"
import {
  Edit,
  Trash2,
  ChevronDown,
  Clipboard,
  Printer,
  Download,
  RotateCw,
  X
} from "react-feather"
import classnames from "classnames"
import { history } from "../../../../history"
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../../../assets/scss/pages/users.scss"
import userImg from "../../../../assets/img/portrait/small/avatar-s-11.jpg"

const data = [
  {
    id: "1",
    name: "500$",
    details: "Пакет",
    image: "",
    cost: "500$",
    status: "Активно"
  },
  {
    id: "2",
    name: "1000$",
    details: "Пакет",
    image: "",
    cost: "1000$",
    status: "Активно"
  },{
    id: "3",
    name: "5000$",
    details: "Пакет",
    image: "",
    cost: "5000$",
    status: "Активно"
  },{
    id: "4",
    name: "10000$",
    details: "Пакет",
    image: "",
    cost: "10000$",
    status: "Активно"
  },{
    id: "5",
    name: "50000$",
    details: "Пакет",
    image: "",
    cost: "50000$",
    status: "Активно"
  },
  {
    id: "6",
    name: "100000$",
    details: "Пакет",
    image: "",
    cost: "100000$",
    status: "Активно"
  }
]

class ProductsList extends React.Component {
  state = {
    rowData: null,
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    defaultColDef: {
      sortable: true
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "ID",
        field: "id",
        width: 150,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true
      },
      {
        headerName: "Наименование",
        field: "name",
        filter: true,
        width: 250
      },
      {
        headerName: "Описание",
        field: "details",
        filter: true,
        width: 250
      },
      {
        headerName: "Картинка",
        field: "image",
        filter: true,
        width: 200
      },
      {
        headerName: "Стоимость",
        field: "cost",
        filter: true,
        width: 200
      },
      {
        headerName: "Статус",
        field: "status",
        filter: true,
        width: 150,
        cellRendererFramework: params => {
          return params.value === "Активно" ? (
            <div className="badge badge-pill badge-light-success">
              {params.value}
            </div>
          ) : params.value === "Деактивировано" ? (
            <div className="badge badge-pill badge-light-danger">
              {params.value}
            </div>
          ) : null
        }
      }
    ]
  }
/*
  async componentDidMount() {
    await axios.get("api/users/list").then(response => {
      let rowData = response.data
      this.setState({ rowData })
    })
  }
*/
async componentDidMount() {
  this.setState( {rowData: data} )
  console.log(this.state.columnDefs)
}

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column)
    var modelObj = null
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val
      }
    }
    filter.setModel(modelObj)
    this.gridApi.onFilterChanged()
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        pageSize: val
      })
    }
  }
  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
    this.setState({
      searchVal: val
    })
  }

  refreshCard = () => {
    this.setState({ reload: true })
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All"
      })
    }, 500)
  }

  toggleCollapse = () => {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onEntering = () => {
    this.setState({ status: "Opening..." })
  }

  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onExiting = () => {
    this.setState({ status: "Closing..." })
  }
  onExited = () => {
    this.setState({ status: "Closed" })
  }
  removeCard = () => {
    this.setState({ isVisible: false })
  }

  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <CardBody>
              <Row className="mb-2">
                <Col>
                  <h3>Продукты компании</h3>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button.Ripple color="primary" className="btn-blockmt-2">
                    + Добавить пакет
                    </Button.Ripple>
                </Col>
              </Row>
              <hr />
              <div className="ag-theme-material ag-grid-table">
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown">
                    <UncontrolledDropdown className="ag-dropdown p-1">
                      <DropdownToggle tag="div">
                        1 - {pageSize} из 150
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(150)}
                        >
                          150
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="filter-actions d-flex">
                    <Input
                      className="mb-1 mb-sm-0"
                      type="text"
                      placeholder="Поиск..."
                      onChange={e => this.updateSearchQuery(e.target.value)}
                      value={this.state.searchVal}
                    />
                  </div>
                </div>
                {this.state.rowData !== null ? (
                  <ContextLayout.Consumer>
                    {context => (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        floatingFilter={true}
                        pagination={true}
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}
                        enableRtl={context.state.direction === "rtl"}
                      />
                    )}
                  </ContextLayout.Consumer>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default ProductsList
