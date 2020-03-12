import React, { Component } from "react";
import Select from 'react-select';
import ToggleButton from 'react-toggle-button';

import "./Table.css";


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleButton: false,
      prePositionInfo: ['Пицца', 'Суши', 'Шашлык'].map((el) => {
        return { value: el, label: el };
      }),
      textFilter: '',
      sortedColumns: {
        firstName: 0,
        lastName: 0,
        phone: 0,
        zipCode: 0,
        cat: 0,
        position: ['Пицца', 'Суши', 'Шашлык'],
        state: 0,
      },
      priority: [],
      searchOptions: ['0'],
    };
    this.resetSortedColumns = {
      firstName: 0,
      lastName: 0,
      phone: 0,
      zipCode: 0,
      cat: 0,
      position: ['Пицца', 'Суши', 'Шашлык'],
      state: 0,
    };
    this.defaultSearchOptions = [ { value: 'firstName', label: 'firstName' } ];
    this.positionColumnRef = React.createRef();
    this.searchSelectRef = React.createRef();
    this.positionsSelectRef = React.createRef();
    this.searchInputRef = React.createRef();
  }

  renderUsers(user, index) {
    const tdInfo = user.map((el, i) => <td key={i + 100 * 10}>{el}</td>);
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        {tdInfo}
      </tr>
    );
  }

  getColumnsArr = () => {
    const arr = [];
    const names = ['Имя', 'Фамилия', 'Телефон', 'Почтовый индекс', 'Дома есть кот', 'Блюдо', 'Регион'];
    for (let key in this.state.sortedColumns) {
      arr.push(key);
    }
    const options = arr.map((el, i) => {
      return { value: i, label: names[i] };
    });
    return options;
  }

  componentWillMount() {
    this.props.setUsersInfo();
  }


  sort = (column, e) => {
    const columnsArr = e.shiftKey ? this.state.sortedColumns : this.resetSortedColumns;
    switch (column) {
      case 0:
        this.state.sortedColumns.firstName === 2 ?
        this.setState((prevState) => {
          return {
            sortedColumns: {
              ...columnsArr,
              firstName: 0,
            }
          }
        }) :
        this.state.sortedColumns.firstName === 1 ?
        this.setState((prevState) => {
          return {
            sortedColumns: {
              ...columnsArr,
              firstName: 2,
            }
          }
        }) :
        this.setState((prevState) => {
          return {
            sortedColumns: {
              ...columnsArr,
              firstName: 1,
            }
          }
        });
        break;
        case 1:
          this.state.sortedColumns.lastName === 2 ?
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                lastName: 0,
              }
            }
          }) :
          this.state.sortedColumns.lastName === 1 ?
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                lastName: 2,
              }
            }
          }) :
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                lastName: 1,
              }
            }
          });
          break;
        case 2:
          this.state.sortedColumns.phone === 2 ?
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                phone: 0,
              }
            }
          }) :
          this.state.sortedColumns.phone === 1 ?
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                phone: 2,
              }
            }
          }) :
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                phone: 1,
              }
            }
          });
          break;
        case 3:
          this.state.sortedColumns.zipCode === 2 ?
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                zipCode: 0,
              }
            }
          }) :
          this.state.sortedColumns.zipCode === 1 ?
          this.setState((prevState) => {
            return {
              sortedColumns: {
                ...columnsArr,
                zipCode: 2,
              }
            }
          }) :
          this.setState((prevState) => {
              return {
                sortedColumns: {
                  ...columnsArr,
                  zipCode: 1,
                }
              }
            });
            break;
          case 4:
            this.state.sortedColumns.cat === 2 ?
            this.setState((prevState) => {
              return {
                sortedColumns: {
                  ...columnsArr,
                  cat: 0,
                }
              }
            }) :
            this.state.sortedColumns.cat === 1 ?
            this.setState((prevState) => {
              return {
                sortedColumns: {
                  ...columnsArr,
                  cat: 2,
                }
              }
            }) :
            this.setState((prevState) => {
                return {
                  sortedColumns: {
                    ...columnsArr,
                    cat: 1,
                  }
                }
              });
              break;
          case 5:
            this.setState((prevState) => {
              return {
                sortedColumns: {
                  ...columnsArr,
                  position: this.positionColumnRef.current.value,
                }
              }
            });
            break;
            case 6:
              this.state.sortedColumns.state === 2 ?
              this.setState((prevState) => {
                return {
                  sortedColumns: {
                    ...columnsArr,
                    state: 0,
                  }
                }
              }) :
              this.state.sortedColumns.state === 1 ?
              this.setState((prevState) => {
                return {
                  sortedColumns: {
                    ...columnsArr,
                    state: 2,
                  }
                }
              }) :
              this.setState((prevState) => {
                  return {
                    sortedColumns: {
                      ...columnsArr,
                      state: 1,
                    }
                  }
                });
                break;
          default:
            throw new Error('Incorrect column');
    }
    const a = e.shiftKey;
    this.setState((prevState) => {
      return {
        priority: a ? [...this.state.priority, column] : [column]
      }
    }, function() { this.props.sortUsersInfo(this.state.sortedColumns, this.state.priority, this.state.textFilter, this.state.searchOptions, this.state.toggleButton); });
  }


  render() {
    return (
      <div className="wrapper" style={{ backgroundColor: "#42648b" }}>

        <table className="table table-hover" style={{ backgroundColor: "#fff", color: "#42648b" }}>
          <thead>
            <tr>
              <th>#</th>
              <th onClick={this.sort.bind(this, 0)}>
                Имя {(this.state.sortedColumns.firstName === 1 && <>&#9660;</>) || (this.state.sortedColumns.firstName === 2 && <>&#9650;</>)}
              </th>
              <th onClick={this.sort.bind(this, 1)}>
                Фамилия {(this.state.sortedColumns.lastName === 1 && <>&#9660;</>) || (this.state.sortedColumns.lastName === 2 && <>&#9650;</>)}
              </th>
              <th onClick={this.sort.bind(this, 2)}>
                Телефон {(this.state.sortedColumns.phone === 1 && <>&#9660;</>) || (this.state.sortedColumns.phone === 2 && <>&#9650;</>)}
              </th>
              <th onClick={this.sort.bind(this, 3)}>
                Почтовый индекс {(this.state.sortedColumns.zipCode === 1 && <>&#9660;</>) || (this.state.sortedColumns.zipCode === 2 && <>&#9650;</>)}
              </th>
              <th onClick={this.state.toggleButton ? null : this.sort.bind(this, 4)}>
                Дома есть кот {(this.state.sortedColumns.cat === 1 && <>&#9660;</>) || (this.state.sortedColumns.cat === 2 && <>&#9650;</>)}
              </th>
              <th>
                Блюдо
              </th>
              <th onClick={this.sort.bind(this, 6)}>
                Регион {(this.state.sortedColumns.state === 1 && <>&#9660;</>) || (this.state.sortedColumns.state === 2 && <>&#9650;</>)}
              </th>
            </tr>
          </thead>
          <tbody>
            {!this.props.users
              ? null
              : this.props.users.map((user, i) => this.renderUsers(user, i))}
          </tbody>
        </table>


      </div>
    );
  }
}

export default Table;
