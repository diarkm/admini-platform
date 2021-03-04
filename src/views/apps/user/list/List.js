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
import ApiModule from '../../../../api/ApiModule'
import { database } from "firebase"

class TransactionList extends React.Component {
  state = {
    rowData: [],
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
        headerName: "User_id",
        field: "user_id",
        filter: true,
        width: 200
      },
      {
        headerName: "Дата",
        field: "created_at",
        filter: true,
        width: 200,
        cellRendererFramework: params => {
          if(params.value)
            return params.value.replace(/\.(.*)/,'').replace('T', ' ')

          return ''
        }
      },
      {
        headerName: "Сумма",
        field: "value",
        filter: true,
        width: 200
      },
      {
        headerName: "Кол-во",
        field: "count",
        filter: true,
        width: 200
      },
      {
        headerName: "Статус",
        field: "status",
        filter: true,
        width: 150,
        cellRendererFramework: params => {
          if(params.value) {
            let $name = params.value.name.toUpperCase()

            if($name === "ОДОБРЕНО") {
              return <div className="badge badge-pill badge-light-success">
                {params.value.name}
              </div>
            } else if ($name === 'В ПРОЦЕССЕ') {
              return <div className="badge badge-pill badge-light-primary">
                {params.value.name}
              </div>
            } else {
              return <div className="badge badge-pill badge-light-danger">
                {params.value.name}
              </div>
            }
          }

          return ''
        }
      },
      {
        headerName: "# действие",
        field: "id",
        filter: false,
        width: 150,
        cellRendererFramework: params => {
          if(params.value) {
            return <Button.Ripple color="danger" onClick={() => history.push('/transactionEdit/' + params.value)} className="btn-blockmt-2">
                Изменить
            </Button.Ripple>
          }

          return ''
        }
      }

    ]
  }

  async getListData (page = 1, event) {
    let data = await new ApiModule().getTransactions(page)

    /**
     * PAGINATION
     */
    let pageSize = data.data.collection.length
    if(data.data) {
      let newData = this.state.rowData,
          templateItem = data.data.collection[0]

      let tempTemplateItem = Object.assign({}, templateItem)

      Object.keys(tempTemplateItem).forEach(itemKey => {
        if(typeof tempTemplateItem[itemKey] == "string" || typeof tempTemplateItem[itemKey] == "number") {
          tempTemplateItem[itemKey] = '...'
        }
      })

      // получаем текущий виртуальный индекс
      let currentIndex = (data.data.page*this.state.pageSize) - this.state.pageSize

      if(page <= 1 && !this.initedRows) {
        // Создаем липовые данные
        for(let i = 0; i < data.data.pages*pageSize; i++) {
          newData.push(tempTemplateItem)
        }

        this.initedRows = true
      }

      let j = 0;
      for(let i = currentIndex; i < currentIndex+pageSize; i++) {
        newData[i] = data.data.collection[j]
        j++
      }

      data.data.collection = newData
    }
    /** /PAGINATION */

    if(data.data) {
      data = data.data.collection
    } else {
      data = []
    }

    if(event) {
      event.api.setRowData(data)
    } else {
      this.setState({rowData: data, pageSize})
    }
  }

  async componentDidMount() {
    this.getListData()
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
                  <h3>Заказы партнеров</h3>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button.Ripple outline color="primary" className="btn-blockmt-2 mr-1">
                    Корзина
                    </Button.Ripple>
                    <Button.Ripple onClick={() => history.push('/transactionAdd')} color="primary" className="btn-blockmt-2">
                    + Добавить заказ
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
                {this.state.rowData.length ? (
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
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}

                        pagination={true}
                        onPaginationChanged={event => {
                          if(event.newPage)
                            this.getListData(event.api.paginationProxy.currentPage + 1, event)
                        }}

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

export default TransactionList
