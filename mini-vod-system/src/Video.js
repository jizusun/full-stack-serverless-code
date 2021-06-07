import { useEffect, useReducer, useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Storage, API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { List, Input, Button } from 'antd';
import { listVideos } from './graphql/queries';
import {
  createVideo as CreateVideo,
  deleteVideo as DeleteVideo,
  updateVideo as UpdateVideo,
} from './graphql/mutations';

const styles = {
  container: { padding: 20 },
  input: { marginBottom: 10 },
  item: { textAlign: 'Left' },
  p: { color: '#1890ff' },
};

const initialState = {
  videos: [],
  loading: true,
  error: false,
  form: { name: '', description: '' },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIDEOS':
      return { ...state, videos: action.videos, loading: false };
    case 'ADD_VIDEO':
      return { ...state, videos: [action.video, ...state.videos] };
    default:
      return state;
  }
};

const Video = (props) => {
  // const [video, setVideo] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    try {
      const videosData = await API.graphql({
        query: listVideos,
      });
      dispatch({
        type: 'SET_VIDEOS',
        videos: videosData.data.listVideos.items,
      });
    } catch (err) {
      console.log('error: ', err);
      dispatch({ type: 'ERROR' });
    }
    // const files = await Storage.list('');
    // const signedFiles = await Promise.all(
    //   files.map(async (file) => {
    //     const signedFile = await Storage.get(file.key);
    //     return signedFile;
    //   })
    // );
    // setVideo(signedFiles);
  }

  async function createVideo(videoName, url, contentType, key) {
    const video = {
      name: videoName,
      video_url: url,
      id: key,
    };
    dispatch({ type: 'ADD_VIDEO', video });
    try {
      await API.graphql({
        query: CreateVideo,
        variables: { input: video },
      });
      console.log('successfully created video!');
    } catch (err) {
      console.log('error: ', err);
    }
  }

  async function deleteVideo({ id }) {
    const index = state.videos.findIndex((n) => n.id === id);
    const videos = [
      ...state.videos.slice(0, index),
      ...state.videos.slice(index + 1),
    ];
    dispatch({ type: 'SET_VIDEOS', videos });
    try {
      await API.graphql({
        query: DeleteVideo,
        variables: { input: { id } },
      });
      console.log('successfully deleted video!');
    } catch (err) {
      console.log(err);
    }
  }

  async function onChange(e) {
    const file = e.target.files[0];
    const filetype = file.name.split('.')[file.name.split.length - 1];
    const contentType = file.type;
    const videoName = file.name.substring(
      0,
      file.name.lastIndexOf('.')
    );
    const { key } = await Storage.put(`${uuid()}.${filetype}`, file, {
      contentType: contentType,
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
    });
    const signedFile = await Storage.get(key);
    createVideo(videoName, signedFile, contentType, key);
  }

  const renderItem = (item) => {
    return (
      <List.Item
        key={item.id}
        actions={[
          <button
            style={styles.p}
            onClick={() => {
              deleteVideo(item);
            }}
          >
            Delete
          </button>,
        ]}
        // extra={}
      >
        <List.Item.Meta
          avatar={
            <img height={100} alt="logo" src={item.video_url} />
          }
          title={item.name}
          description={item.description}
        />
      </List.Item>
    );
  };

  return (
    <div>
      <header>
        <input type="file" onChange={onChange} />
        <List
          loading={state.loading}
          dataSource={state.videos}
          renderItem={renderItem}
        />
        {/* <ul>
          {state.videos.map((v) => (
            <li key={v.name}>
              <img
                src={v.video_url}
                key={v.name}
                style={{ width: 500 }}
                alt={v}
              />
            </li>
          ))}
        </ul> */}
      </header>
    </div>
  );
};

export default withAuthenticator(Video);
