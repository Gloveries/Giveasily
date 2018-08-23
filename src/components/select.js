import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col, TabPane, TabContent, Nav, NavItem, NavLink } from 'mdbreact';
import classnames from 'classnames';

class TabsPage extends React.Component {
  constructor(props) {
    super(props);

    this.toggleClassicTabs1 = this.toggleClassicTabs1.bind(this);
    this.state = {
      activeItemClassicTabs1: '1',
    };
  }

  toggleClassicTabs1(tab) {
    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({
        activeItemClassicTabs1: tab
      });
    }
  }


  render() {
    return (
      <Router>
        <Container className="mt-4">
          <Row>
            <Col md="12">
              <h2 className="mt-5">Classic tabs</h2>
              <div className="classic-tabs">
                <Nav classicTabs color="cyan">
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '1' })} onClick={() => { this.toggleClassicTabs1('1'); }}>
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '2' })} onClick={() => { this.toggleClassicTabs1('2'); }}>
                    Follow
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '3' })} onClick={() => { this.toggleClassicTabs1('3'); }}>
                          Contact
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '4' })} onClick={() => { this.toggleClassicTabs1('4'); }}>
                      Be Awesome
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="card" activeItem={this.state.activeItemClassicTabs1}>
                  <TabPane tabId="1">
                    <p>Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias.</p>
                  </TabPane>
                  <TabPane tabId="2">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
                  </TabPane>
                  <TabPane tabId="3">
                    <p>Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias.</p>
                  </TabPane>
                  <TabPane tabId="4">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione porro voluptate odit minima.</p>
                  </TabPane>
                </TabContent>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default TabsPage;


