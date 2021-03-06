$(function(){
    window.cc = new Bitbucket({
      "debug": true,
      "callback": mocha.run,
      "overlay": true,
      "enterprise": '',
      "debug_url": "https://bitbucket.org/osallou/go-docker/src/8c304f3171716b23f78dc6c1f6541b290a43386b/godocker/godscheduler.py"
    });
});

describe('bitbucket src', function(){
  after(function(){save_coverage('bb-src');});
  it('should start with no errors', function(){
    expect(window.cc).to.have.property('slug').and.to.equal('osallou/go-docker');
    expect(window.cc).to.have.property('ref').and.to.equal('8c304f3171716b23f78dc6c1f6541b290a43386b');
    expect(window.cc).to.have.property('page').and.to.equal('src');
    expect(window.cc).to.have.property('base').and.to.equal('');
  });
  it('should add coverage button', function(){
    var button = $('a.aui-button.codecov');
    expect(button.length).to.equal(1);
    expect(button.text()).to.equal('Coverage 62.17%');
    expect(button.attr('title')).to.equal('Toggle Codecov');
  });
  it('should add covered lines', function(){
    expect($('.codecov.aui-button').hasClass('aui-button-light')).to.be.true;
    var x = 0;
    expect($("a[name='godscheduler.py-70']").hasClass('codecov codecov-hit')).to.be.true;
    expect($("a[name='godscheduler.py-71']").hasClass('codecov codecov-partial')).to.be.true;
    expect($("a[name='godscheduler.py-74']").hasClass('codecov')).to.be.false;
    expect($("a[name='godscheduler.py-75']").hasClass('codecov codecov-missed')).to.be.true;
  });
  it('will toggle it', function(){
    // first click
    click($('.codecov.aui-button')[0]);
    expect($('.codecov.aui-button').hasClass('aui-button-light')).to.be.false;
    expect($("a[name='godscheduler.py-70']").hasClass('codecov-on')).to.be.false;
    expect($("a[name='godscheduler.py-71']").hasClass('codecov-on')).to.be.false;
    expect($("a[name='godscheduler.py-75']").hasClass('codecov-on')).to.be.false;
    // second click
    click($('.codecov.aui-button')[0]);
    expect($('.codecov.aui-button').hasClass('aui-button-light')).to.be.true;
    expect($("a[name='godscheduler.py-70']").hasClass('codecov-on')).to.be.true;
    expect($("a[name='godscheduler.py-71']").hasClass('codecov-on')).to.be.true;
    expect($("a[name='godscheduler.py-75']").hasClass('codecov-on')).to.be.true;
  });
});
