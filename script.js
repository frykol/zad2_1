(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  const select = document.getElementById('select');

  const form = document.getElementById('form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(form);
    const post = {
      title: formData.get('title'),
      body: formData.get('body'),
      userId: 1
    };

    CreatePost(post).then(createdPost => {
      answer.innerHTML = 'Dodano nowy post o id: ' + createdPost.id + '<br>' + JSON.stringify(createdPost, null, 2);
    });
  });

  for (let i = 0; i< 10; i++) {
    let option = document.createElement("option");
    option.value = i + 1;
    option.textContent = i + 1;
    select.appendChild(option);
  }

  let isLoading = false;
  let isProcessing = false;

  const setProcessing = (processing) => {
    isProcessing = processing;
    answer.textContent = processing ? 'Processing...' : '';
  }

  const setLoading = (loading) => {
    isLoading = loading;
    answer.textContent = loading ? 'Loading...' : '';
  }

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchPosts = () => {
    setLoading(true);

    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(async (array) => {
        console.log(array)
        await wait(1000);
        return array;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const fetchPostById = (id) => {
    setLoading(true);

    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(async (post) => {
        console.log(post)
        await wait(1000);
        return post;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const CreatePost = (post) => {
    setProcessing(true);

    return fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(async (post) => {
        console.log(post)
        await wait(1000);
        return post;
      })
      .finally(() => {
        setProcessing(false);
      });
  }

  example.addEventListener("click", function () {
    fetchPosts().then(array => {
      answer.textContent = JSON.stringify(array, null, 2);
    })
  })

  cw1.addEventListener("click", function () {
    fetchPosts().then(array => {
      answer.innerHTML = '';
      array.forEach(post => {
        let newDiv = document.createElement("div");
        let new_p = document.createElement("p");
        let new_id_p = document.createElement("p");
        let new_h2 = document.createElement("h2");
        let post_and_user_id = `Post ID: ${post.id}, User ID: ${post.userId}`;
        newDiv.classList.add("post");
        newDiv.style.border = "1px solid #ccc";
        new_h2.textContent = post.title;
        new_p.textContent = post.body;
        new_id_p.textContent = post_and_user_id;

        newDiv.appendChild(new_id_p);
        newDiv.appendChild(new_h2);
        newDiv.appendChild(new_p);
        answer.appendChild(newDiv);
      });
    });
  })

  cw2.addEventListener("click", function () {
    let id = select.value;
    fetchPostById(id).then(post => {
      answer.innerHTML = '';
      let newDiv = document.createElement("div");
      let new_p = document.createElement("p");
      let new_id_p = document.createElement("p");
      let new_h2 = document.createElement("h2");
      let post_and_user_id = `Post ID: ${post.id}, User ID: ${post.userId}`;
      newDiv.classList.add("post");
      newDiv.style.border = "1px solid #ccc";
      new_h2.textContent = post.title;
      new_p.textContent = post.body;
      new_id_p.textContent = post_and_user_id;

      newDiv.appendChild(new_id_p);
      newDiv.appendChild(new_h2);
      newDiv.appendChild(new_p);
      answer.appendChild(newDiv);
    });
  })

  cw3.addEventListener("click", function () {
    //TODO
  })

})();
