import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import getGallery from 'api/api';
import { Notify } from 'notiflix';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const PER_PAGE = '12';

export default class App extends Component {
  state = {
    isLoading: false,
    isError: false,
    filter: '',
    pictures: [],
    page: 1,
    pictureId: null,
    showModal: false,
  };

  async componentDidUpdate(_, firstState) {
    if (
      firstState.filter !== this.state.filter ||
      firstState.page !== this.state.page
    ) {
      this.setState({
        isLoading: true,
      });
      try {
        const response = await getGallery(this.state.filter, this.state.page);
        if (response.length === 0) {
          Notify.failure('Sorry, no images for your request :(');
        }
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...response],
        }));
      } catch (error) {
        this.setState({
          isError: error.message,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleSubmit = async inputValue => {
    if (inputValue !== this.state.filter) {
      this.setState({
        pictures: [],
        filter: inputValue,
        page: 1,
      });
    }
  };

  addMorePages = async () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  toggleModal = id => {
    this.setState({
      pictureId: id,
    });
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { pictures, isLoading, showModal, pictureId } = this.state;

    return (
      <div
        style={{
          height: '100vh',
          display: 'grid',
          alignContent: 'start',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery
          pictures={this.state.pictures}
          toggleModal={this.toggleModal}
        />
        {isLoading && <Loader />}
        {pictures.length >= PER_PAGE && pictures.length % PER_PAGE === 0 && (
          <Button onClick={this.addMorePages} />
        )}
        {showModal && (
          <Modal
            pictures={pictures}
            id={pictureId}
            onClose={this.toggleModal}
            showModal={this.state.showModal}
          />
        )}
      </div>
    );
  }
}
